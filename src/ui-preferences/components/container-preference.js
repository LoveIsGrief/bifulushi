import Vue from '/libs/vue.js';

Vue.component('container-preference', {
    name: 'ContainerPreferenceComponent',
    props: [
      'container',
    ],
    data() {
      return {
        open: false,
      }
    },
    template: '#container-preference',
    computed: {
      lifetimePreferenceName() {
        return `containers.${this.container.cookieStoreId}.lifetime`
      },
      classes() {
        return [
          'container-preference',
          this.open ? 'open' : '',
        ]
      },
    },
  },
);
