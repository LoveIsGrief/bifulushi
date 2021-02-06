import Vue from '/libs/vue.min.js';
import PreferenceStorage from '/src/Storage/PreferenceStorage.js';

export default Vue.extend({
  props: [
    'preference',
    'label',
    'description',
  ],
  template: '#TODO',
  data() {
    return {
      value: false,
    }
  },
  async created() {
    this.value = await PreferenceStorage.get(this.preference, true);
  },
  watch: {
    async value(newValue, oldValue) {
      await PreferenceStorage.set({
        key: this.preference,
        value: newValue,
      })
    },
  },
});
