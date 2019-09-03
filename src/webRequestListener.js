import Storage from './Storage/HostStorage';
import ContextualIdentity, {NO_CONTAINER} from './ContextualIdentity';
import Tabs from './Tabs';
import PreferenceStorage from './Storage/PreferenceStorage';

const createTab = (url, newTabIndex, currentTabId, cookieStoreId) => {
  Tabs.get(currentTabId).then((currentTab) => {
    Tabs.create({
      url,
      index: newTabIndex,
      cookieStoreId,
      active: currentTab.active,
    });
    PreferenceStorage.get('keepOldTabs').then(({value}) => {
      if(!value){
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

export const webRequestListener = (requestDetails) => {

  if (requestDetails.frameId !== 0 || requestDetails.tabId === -1) {
    return {};
  }

  return Promise.all([
    Storage.get(requestDetails.url),
    ContextualIdentity.getAll(),
    Tabs.get(requestDetails.tabId),
  ]).then(([hostMap, identities, currentTab]) => {

    if (currentTab.incognito || !hostMap) {
      return {};
    }

    const hostIdentity = identities.find((identity) => identity.cookieStoreId === hostMap.cookieStoreId);
    const tabIdentity = identities.find((identity) => identity.cookieStoreId === currentTab.cookieStoreId);

    if (!hostIdentity) {
      return {};
    }

    if (hostIdentity.cookieStoreId === NO_CONTAINER.cookieStoreId && tabIdentity) {
      return createTab(requestDetails.url, currentTab.index + 1, currentTab.id);
    }

    if (hostIdentity.cookieStoreId !== currentTab.cookieStoreId && hostIdentity.cookieStoreId !== NO_CONTAINER.cookieStoreId) {
      return createTab(requestDetails.url, currentTab.index + 1, currentTab.id, hostIdentity.cookieStoreId);
    }

    return {};
  });

};
