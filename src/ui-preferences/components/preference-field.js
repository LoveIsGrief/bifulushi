import {BaseCustomElement} from './base.js';

export class PreferenceFieldElement extends BaseCustomElement {
  constructor() {
    super();
    this._makeShadowRoot('preference-field');
  }

  connectedCallback() {
    // Sets the header
    this.header = this.header;
  }

  get header() {
    return this.getAttribute('header');
  }

  set header(value) {
    this.setAttribute('header', value);
    this._shadowRoot.querySelector('header').innerHTML = value;
  }
}

customElements.define('preference-field', PreferenceFieldElement);
