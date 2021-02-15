import Vue from '/libs/vue.js';

Vue.component('toggle', {
  template: '#toggle',
  props:{
    active: {
      type: Boolean,
      default: false,
    },
    activeIcon: {
      type: String,
    },
    inactiveIcon: {
      type: String,
    },
  },
  computed: {
    classes() {
      return [
        'toggle',
        this.active ? 'toggle--active' : '',
      ]
    },
  },
  methods: {
    toggle(){
      this.active = !this.active
      this.$emit("toggle", this.active)
    },
  },
})
