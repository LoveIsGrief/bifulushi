import Vue from '/libs/vue.min.js'
import BasePreference from './base.js'

const ATTR_DEFAULT = 'default-radio';
export const PREFIX = 'radio-';

/**
 * Creates styled radio buttons
 * from attributes with the "radio-" prefix
 */
Vue.component('radio-preference', BasePreference.extend({
    name: 'RadioPreferenceComponent',
    template: '#radio-preference',
    data() {
      const defaultValue = this.$attrs[ATTR_DEFAULT];
      const choices = Object.keys(this.$attrs)
        .filter(attrName => attrName.startsWith(PREFIX))
        .map(attrName => {
          return {
            value: attrName.substr(PREFIX.length),
            label: this.$attrs[attrName],
          }
        });
      console.debug(`${this.preference} defaultValue`, defaultValue)
      console.debug(`${this.preference} choices`, choices)
      return {
        choices: choices,
        name: `${PREFIX}${this.preference}`,
        value: defaultValue,
      }
    },
  },
));

