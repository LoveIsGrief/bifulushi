import Vue from '/libs/vue.min.js';
import BasePreference from './base.js';
import {CONTAINER_LIFETIMES, DEFAULT_CONTAINER_LIFETIME} from '/src/constants.js';

export const PREFIX = 'radio-';

Vue.component('lifetime-preference', BasePreference.extend({
    name: 'LifetimePreferenceComponent',
    template: '#radio-preference',
    props: {
      label: {
        type: String,
        default: 'Lifetime',
      },
      description: {
        type: String,
        default: 'How long a container will live',
      },
    },
    data() {
      return {
        name: `${PREFIX}${this.preference}`,
        label: 'Lifetime',
        choices: Object.keys(CONTAINER_LIFETIMES)
          .map(lifetime => {
            return {
              value: lifetime,
              label: CONTAINER_LIFETIMES[lifetime],
            };
          }),
        value: DEFAULT_CONTAINER_LIFETIME,
      };
    },
  },
));

