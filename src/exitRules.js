import HostStorage from "./Storage/HostStorage.js"
import ExitRuleStorage from "./Storage/ExitRuleStorage.js"
import ContextualIdentities from "./ContextualIdentity/index.js"
import Tabs from "./Tabs/index.js"
import {matchesSavedMap} from "./utils.js"
import PreferenceStorage from "./Storage/PreferenceStorage.js"
import {CONTAINER_LIFETIME_LAST} from "./constants.js"

const NEW_EXIT_RULE_CONTAINER = "create-exit-rule-container"


/**
 * A context menu to create a container with exit rules from the entry rules of the given tab
 *
 * It's a quick method of allowing a URL to exist in two containers at once
 *
 * @return {Promise<*>}
 */
export async function createReverseContainerMenu() {
    console.debug("creating reverse containermenu")
    await browser.menus.removeAll()
    await browser.menus.create({
        id: NEW_EXIT_RULE_CONTAINER,
        title: "Reopen in reverse container",
        contexts: ["tab"],
    })
    console.debug(`Created ${NEW_EXIT_RULE_CONTAINER} menu`)


    return browser.menus.onClicked.addListener(async function (menuInfo, tab) {
        console.log(arguments)
        if (menuInfo.menuItemId !== NEW_EXIT_RULE_CONTAINER) {
            return
        }
        const origContainerId = tab.cookieStoreId
        if (!origContainerId) {
            console.error("Tab isn't in container! Can't create reverse container")
            return
        }

        const originalContainer = await ContextualIdentities.getById(origContainerId)
        const containerName = `Reverse ${originalContainer.name}`;

        // Get entry rules
        const hosts = await HostStorage.getAll()
        const exitRules = Object.keys(hosts)
          .map(key => hosts[key])
          .filter(hostObject => hostObject.cookieStoreId === origContainerId)
          .map(hostO => {
              return {
                  accept: false,
                  pattern: hostO.host,
              }
          })

        // Create reverse container
        const container = await ContextualIdentities.create({
            name: containerName,
            icon: originalContainer.icon,
            color: originalContainer.color,
        })

        // Set exit rules
        await ExitRuleStorage.set({
            key: container.cookieStoreId,
            value: exitRules,
        })

        // Set lifetime
        await PreferenceStorage.set({
            key: `containers.${container.cookieStoreId}.lifetime`,
            value: CONTAINER_LIFETIME_LAST,
        })

        // Open URL in new container
        // We need to use the new page first otherwise the url will be caught by bifulushi
        const newTab = await Tabs.create({
            cookieStoreId: container.cookieStoreId,
        });
        return Tabs.update(newTab.id, {
            url: tab.url,
        })
    })
}

/**
 * Checks if a url may exit a container
 *
 * Find the first matching exit rule.
 *
 * @param url {String}
 * @param exitRules {ExitRule[]}
 * @param preferences {Object}
 *
 * @return {Boolean} true by default
 */
export function canExit(url, exitRules, preferences) {
    for (let exitRule of exitRules) {
        if (!matchesSavedMap(url, preferences, {host: exitRule.pattern})) {
            continue;
        }
        return exitRule.accept;
    }
    return true;
}
