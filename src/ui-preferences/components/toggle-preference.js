import {BaseCustomElement} from './base.js';

export class TogglePreferenceElement extends BaseCustomElement {

  constructor() {
    super();
    this._makeShadowRoot('toggle-preference');
  }

  // TODO: event for check/uncheck
  // TODO: change text on state change

}

customElements.define('toggle-preference', TogglePreferenceElement);
