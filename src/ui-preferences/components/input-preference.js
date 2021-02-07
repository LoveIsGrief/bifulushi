import Vue from '/libs/vue.js';
import BasePreference from './base.js'

Vue.component('input-preference', BasePreference.extend({
    props: [
      'preference',
      'label',
      'type',
    ],
    template: '#input-preference',
  }),
);
