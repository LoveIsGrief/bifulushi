import Vue from '/libs/vue.min.js';
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
