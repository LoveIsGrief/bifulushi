import "./components/container-preference.js";
import "./components/info-tooltip.js";
import "./components/input-preference.js";
import "./components/lifetime-preference.js";
import "./components/toggle.js";
import "./components/toggle-preference.js";
import Vue from '/libs/vue.js';

import ContextualIdentities from "/src/ContextualIdentity/index.js"

new Vue({
  el: '#preference-app',
  data: {
    activeTab: 'preferences',
    containers: [],
  },
  methods: {
    isActive(tabName) {
      return tabName === this.activeTab
    },
    getTabClasses(tabName) {
      return [
        'tab-container__tab',
        this.isActive(tabName) ? 'tab-container__tab--active' : '',
      ]
    },
  },
  async beforeCreate() {
    this.containers = await ContextualIdentities.get()
  },
})
