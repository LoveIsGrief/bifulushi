import {tabUpdatedListener, webRequestListener} from './containers.js';
import {messageExternalListener} from './messageExternalListener.js';
import {cleanUpTemporaryContainers, onTabCreated, onTabRemoved} from './temporaryContainers.js';
import {createReverseContainerMenu} from "./exitRules.js"

browser.webRequest.onBeforeRequest.addListener(
  webRequestListener,
  {urls: ['<all_urls>'], types: ['main_frame']},
  ['blocking'],
);

browser.runtime.onMessageExternal.addListener(
  messageExternalListener
);

browser.tabs.onUpdated.addListener(
    tabUpdatedListener
);

browser.tabs.onCreated.addListener(onTabCreated);
browser.tabs.onRemoved.addListener(onTabRemoved);

createReverseContainerMenu()

// Clean up left over containers at startup
cleanUpTemporaryContainers();
