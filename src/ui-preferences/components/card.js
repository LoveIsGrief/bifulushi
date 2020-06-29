import {BaseCustomElement} from './base.js';

export class CardElement extends BaseCustomElement {
  constructor() {
    super();
    this._makeShadowRoot('card-el');
  }
}

customElements.define('card-el', CardElement);
