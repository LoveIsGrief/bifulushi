import Storage from './Storage/HostStorage.js';
import ContextualIdentity, {NO_CONTAINER} from './ContextualIdentity/index.js';
import Tabs from './Tabs/index.js';
import PreferenceStorage from './Storage/PreferenceStorage.js';
import {filterByKey} from './utils.js';
import {buildDefaultContainer} from './defaultContainer.js';
import ExitRuleStorage from './Storage/ExitRuleStorage.js';
import {canExit} from "./exitRules.js"

const IGNORED_URLS_REGEX = /^(about|moz-extension|file|javascript|data|chrome):/;

/**
 * Keep track of the tabs we're creating
 * tabId: url
 */
const creatingTabs = {};

const createTab = (url, newTabIndex, currentTabId, openerTabId, cookieStoreId) => {
  Tabs.get(currentTabId).then((currentTab) => {
    const createOptions = {
      url,
      index: newTabIndex,
      cookieStoreId,
      active: currentTab.active,
      pinned: currentTab.pinned,
      discarded: currentTab.discarded,
      openInReaderMode: currentTab.isInReaderMode,
    };
    // Passing the openerTabId without a cookieStoreId
    // creates a tab in the same container as the opener
    if (cookieStoreId && openerTabId) {
      createOptions.openerTabId = openerTabId;
    }
    Tabs.create(createOptions).then((createdTab) => {
      creatingTabs[createdTab.id] = url;
      if (!cookieStoreId && openerTabId) {
        Tabs.update(createdTab.id, {
          openerTabId: openerTabId,
        });
      }
    });
    PreferenceStorage.get('keepOldTabs').then(({value}) => {
      // if keepOldTabs is false, remove the 'old' tab
      // -or-
      // if the current tab is about:blank or about:newtab
      // or some custom moz-extension pages
      // we should still close the current tab even though
      // keepOldTabs is true, because these are just
      // interstitial tabs that are no longer used
      if (!value || /^(about:)|(moz-extension:)/.test(currentTab.url)) {
        Tabs.remove(currentTabId);
      }
    }).catch(() => {
      Tabs.remove(currentTabId);
    });

  });

  return {
    cancel: true,
  };
};


async function handle(url, tabId, cookieStoreId) {
  const creatingUrl = creatingTabs[tabId];
  if (IGNORED_URLS_REGEX.test(url) || creatingUrl === url) {
    return;
  } else if (creatingUrl) {
    delete creatingTabs[tabId];
  }
  let preferences = await PreferenceStorage.getAll(true);
  let [hostMap, identities, currentTab, exitRules] = await Promise.all([
    Storage.get(url, preferences),
    ContextualIdentity.getAll(),
    Tabs.get(tabId),
    ExitRuleStorage.get(cookieStoreId, true),
  ]);

  if (currentTab.incognito || !hostMap) {
    return {};
  }

  // Make sure the current URL may exit the container
  if(exitRules && !canExit(url, exitRules, preferences)){
    return{}
  }

  const hostIdentity = identities.find((identity) => identity.cookieStoreId === hostMap.cookieStoreId);
  let targetCookieStoreId;

  if (!hostIdentity) {
    if (preferences.defaultContainer) {
      const defaultContainer = await buildDefaultContainer(
          filterByKey(preferences, prefKey => prefKey.startsWith('defaultContainer')),
          url
      );
      targetCookieStoreId = defaultContainer.cookieStoreId;
      // console.debug('Going to open', url, 'in default container', targetCookieStoreId, defaultContainer.name);
    } else {
      return {};
    }
  } else {
    targetCookieStoreId = hostIdentity.cookieStoreId;
  }

  const targetIsNoContainer = targetCookieStoreId === NO_CONTAINER.cookieStoreId;
  const tabHasContainer = currentTab.cookieStoreId !== NO_CONTAINER.cookieStoreId;
  const tabInDifferentContainer = currentTab.cookieStoreId !== targetCookieStoreId;
  const openInNoContainer = targetIsNoContainer && tabHasContainer;
  if ((tabInDifferentContainer && !openInNoContainer) || openInNoContainer) {
    return createTab(
        url,
        currentTab.index + 1, currentTab.id,
        currentTab.openerTabId,
        targetCookieStoreId);
  }

  return {};

}

export const webRequestListener = (requestDetails) => {

  if (requestDetails.frameId !== 0 || requestDetails.tabId === -1) {
    return {};
  }
  return handle(requestDetails.url, requestDetails.tabId, requestDetails.cookieStoreId);
};

export const tabUpdatedListener = (tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return;
  }
  return handle(changeInfo.url, tabId, tab.cookieStoreId);
};
