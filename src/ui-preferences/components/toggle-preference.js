import PreferenceStorage from '/src/Storage/PreferenceStorage.js';

export default {
  props: [
    'preference',
    'label',
    'description',
  ],
  template: '#toggle-preference',
  data() {
    return {
      value: null
    }
  },
  async created(){
    console.log("preference", this.preference)
    this.value = await PreferenceStorage.get(this.preference, true);
  },
  watch:{
    // FIXME: Somehow, always the same preference is being triggered
    async value(newValue, oldValue){
      console.log(this)
      console.log("preference", this.preference)
      if(!this.preference){
        return
      }
      await PreferenceStorage.set({
        key: this.preference,
        value: newValue,
      })
    },
  },
  methods:{
    async save(){
    }
  }
};
