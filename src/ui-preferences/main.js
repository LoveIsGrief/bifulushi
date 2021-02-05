import Vue from '/libs/vue.min.js';

const app = new Vue({
  el: '#preference-app',
  data: {
    activeTab: 'preferences',
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
