import Vue from "/libs/vue.min.js";
import PreferenceStorage from '/src/Storage/PreferenceStorage.js';

Vue.component("toggle-preference", {
  props: [
    'preference',
    'label',
    'description',
  ],
  template: '#toggle-preference',
  data() {
    return {
      value: false,
    }
  },
  async created(){
    this.value = await PreferenceStorage.get(this.preference, true);
  },
  watch:{
    async value(newValue, oldValue){
      await PreferenceStorage.set({
        key: this.preference,
        value: newValue,
      })
    },
  },
  methods: {
    classes(){
      return [
        "toggle-container",
        this.value ? "toggle-container--active": ""
      ]
    }
  }
})
