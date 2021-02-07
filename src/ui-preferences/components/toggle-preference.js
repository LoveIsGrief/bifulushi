import Vue from '/libs/vue.js';
import BasePreference from './base.js'

Vue.component('toggle-preference', BasePreference.extend({
  template: '#toggle-preference',
  methods: {
    classes() {
      return [
        'toggle-container',
        this.value ? 'toggle-container--active' : '',
      ]
    },
  },
}))
