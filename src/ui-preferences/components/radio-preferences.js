import {BaseCustomElement} from './base.js';
import {createEl} from '../utils.js';

const RADIO_NAME = 'radio';

export const PREFIX = 'radio-';

/**
 * Creates styled radio buttons
 * from attributes with the "radio-" prefix
 */
export class RadioPreferencesElement extends BaseCustomElement {

  constructor() {
    super();
    this._makeShadowRoot('radio-preferences');
    // TODO: Allow defining the default selection
    this.getAttributeNames()
        .filter(name => name.startsWith(PREFIX))
        .map(this.createRadio.bind(this))
        .forEach(this._shadowRoot.appendChild.bind(this._shadowRoot));
  }

  createRadio(name) {
    // TODO: Trigger events when something is selected
    const value = this.getAttribute(name);
    return createEl(`
    <label class="radio-container">
      <input type="radio" name="${RADIO_NAME}">
      <span class="radio-container__overlay"></span>
      <span class="radio-container__label">${value}</span>
    </label>
    `);
  }

}

customElements.define('radio-preferences', RadioPreferencesElement);
