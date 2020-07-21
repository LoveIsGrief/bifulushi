import {BaseCustomElement} from './base.js';
import {createEl} from '../utils.js';

const RADIO_NAME = 'radio';
const ATTR_DEFAULT = 'default-radio';
export const PREFIX = 'radio-';

/**
 * Creates styled radio buttons
 * from attributes with the "radio-" prefix
 */
export class RadioPreferencesElement extends BaseCustomElement {

  constructor() {
    super();
    this._makeShadowRoot('radio-preferences');

    const radioAttributes = this.getAttributeNames()
        .filter(name => name.startsWith(PREFIX));
    if(!radioAttributes.length){
      // No radio attributes means no radios to create
      return;
    }
    this._defaultRadio = this.getAttribute(ATTR_DEFAULT) || radioAttributes[0];
    radioAttributes.map(this.createRadio.bind(this))
        .forEach(this._shadowRoot.appendChild.bind(this._shadowRoot));
  }

  createRadio(id) {
    // TODO: Trigger events when something is selected
    const value = this.getAttribute(id);
    const $label = createEl(`
    <label id="${id}" class="radio-container">
      <input type="radio" name="${RADIO_NAME}">
      <span class="radio-container__overlay"></span>
      <span class="radio-container__label">${value}</span>
    </label>
    `);
    $label.querySelector('input').checked = this._defaultRadio === id;
    return $label;
  }

}

customElements.define('radio-preferences', RadioPreferencesElement);
