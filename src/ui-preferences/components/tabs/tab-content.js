import {BaseCustomElement} from '../base.js';

export class TabContent extends BaseCustomElement {
  constructor() {
    super();
    this._makeShadowRoot('tab-content');
  }

  get tabTitle() {
    return this.getAttribute('tab-title');
  }

  set tabTitle(value) {
    this.setAttribute('tab-title', value);
  }
}
customElements.define('tab-content', TabContent);
