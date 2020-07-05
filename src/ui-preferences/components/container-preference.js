import {BaseCustomElement} from './base.js';

export class ContainerPreferenceElement extends BaseCustomElement {

  constructor() {
    super();
    this._makeShadowRoot('container-preference');
    this.$icon = this._shadowRoot.querySelector('.icon');
    this.$icon.addEventListener('click', ()=> this.open = !this.open);
  }

  connectedCallback() {
    this.header = this.header;
  }

  get header() {
    return this.getAttribute('header');
  }

  set header(value) {
    this.setAttribute('header', value);
    this._shadowRoot.querySelector('#header').innerHTML = value;
  }

  get open(){
    return this.classList.contains('open');
  }
  set open(value){
    this.classList.toggle('open', value);
  }
}

customElements.define('container-preference', ContainerPreferenceElement);
