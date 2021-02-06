import Vue from '/libs/vue.min.js';
import PreferenceStorage from '/src/Storage/PreferenceStorage.js';

export default Vue.extend({
  props: [
    'preference',
    'label',
    'description',
    'docUrl',
  ],
  template: '#TODO',
  data() {
    return {
      value: undefined,
    }
  },
  async created() {
    const value = await PreferenceStorage.get(this.preference, true);
    if(value === undefined){
      console.debug(`Preference ${this.preference} doesn't have a stored value`)
      return
    }
    this.value = value;
    console.debug(`Loaded preference ${this.preference}`, this.value)
  },
  watch: {
    async value(newValue, oldValue) {
      console.debug(`Setting preference ${this.preference}`, newValue)
      await PreferenceStorage.set({
        key: this.preference,
        value: newValue,
      })
    },
  },
});
