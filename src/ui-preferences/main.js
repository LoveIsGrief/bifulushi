import Vue from '/libs/vue.min.js';
import TogglePreference from "./components/toggle-preference.js";

const app = new Vue({
  el: '#preference-app',
  data: {
    activeTab: 'preferences',
  },
  components: {
    "toggle-preference": TogglePreference,
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
});

// app.component("toggle-preference", TogglePreference)
