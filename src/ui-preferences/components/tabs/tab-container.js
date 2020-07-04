import {BaseCustomElement} from '../base.js';
import {TabContent} from './tab-content.js';
import {createEl} from '../../utils.js';

class TabContainer extends BaseCustomElement {
  constructor() {
    super();
    this._makeShadowRoot('tab-container');
    this.buildTabs();
  }

  buildTabs() {
    // First build the checked default tab
    this.buildTab(this.getCurrentContent())
        .querySelector('input').checked = true;

    // Then the hidden tabs
    const $hiddenSlot = this.getAssignedHiddenSlot();
    const $contents = $hiddenSlot.querySelectorAll('tab-content');
    for (let $content of $contents) {
      this.buildTab($content);
    }
  }

  buildTab($content) {
    const $header = this._shadowRoot.querySelector('header');
    const title = $content.tabTitle;
    // Create tab
    let $tab = createEl(`<div>
      <input type="radio" name="tab" id="${title}">
      <label for="${title}">${title}</label>
    </div>
    `);
    $header.appendChild($tab);

    // Connect tab
    $tab.querySelector('input').addEventListener(
        'click',
        this.activateView.bind(this, title, $content)
    );
    return $tab;
  }

  getCurrentSlot() {
    return this._shadowRoot.querySelector('.current-view slot');
  }

  getCurrentContent() {
    const $slot = this.getCurrentSlot();
    const assignedEls = $slot.assignedElements();
    if (assignedEls.length < 1) {
      throw new Error('No content provided');
    }
    const $tabContent = assignedEls[0];
    if (!(assignedEls[0] instanceof TabContent)) {
      throw new Error('Not a TabContent element');
    }
    return $tabContent;
  }

  getAssignedHiddenSlot() {
    const $hiddenSlot = this._shadowRoot.querySelector('.hidden-views slot');
    return this.querySelector(`[slot='${$hiddenSlot.name}']`);
  }

  activateView(name, $newTabContent) {
    const $tabContent = this.getCurrentContent();
    if ($tabContent.tabTitle === name) {
      console.debug('Already selected');
      return;
    }

    // Move current content to hidden views
    const $hiddenSlot = this.getAssignedHiddenSlot();
    $tabContent.removeAttribute('slot');
    $hiddenSlot.appendChild($tabContent);

    // Move new content to current view
    this.appendChild($newTabContent);
    $newTabContent.setAttribute('slot', this.getCurrentSlot().name);

  }

}

customElements.define('tab-container', TabContainer);
