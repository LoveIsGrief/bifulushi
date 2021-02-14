import Vue from '/libs/vue.js';
import ExitRuleStorage from '../../Storage/ExitRuleStorage.js';

Vue.component('container-preference', {
    name: 'ContainerPreferenceComponent',
    template: '#container-preference',
    props: [
      'container',
    ],
    data() {
      return {
        open: false,
        rules: [],
      };
    },
    async created() {
      const rules = (await ExitRuleStorage.get(this.container.cookieStoreId, true)) || [];
      console.debug(`${this.container.cookieStoreId} Loaded rules`, rules);
      for (let rule of rules) {
        this.rules.push(rule);
      }
    },
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
    methods: {
      addRule() {
        this.rules.push({
          id: Date.now(),
          accept: true,
          pattern: '',
        })
        this.saveRules()
      },
      removeRule(index) {
        this.rules.splice(index, 1)
        this.saveRules()
      },
      moveRuleDown(index) {
        this.rules.splice(index, 2, this.rules[index + 1], this.rules[index])
        this.saveRules()
      },
      moveRuleUp(index) {
        this.rules.splice(index - 1, 2, this.rules[index], this.rules[index - 1])
        this.saveRules()
      },
      updateRuleAccept(rule, newReject) {
        rule.accept = newReject
        this.saveRules()
      },
      updateRulePattern(rule, newPattern) {
        rule.pattern = newPattern
        this.saveRules()
      },
      saveRules() {
        // Prepare for saving
        // Vuejs adds attributes that make firefox just throw away entire fields
        const toSave = this.rules.map(rule => {
          return {
            accept: rule.accept,
            pattern: rule.pattern,
          }
        })

        // Save the rules with debug logging
        console.debug(`${this.container.cookieStoreId} saving rules`, toSave[0])
        ExitRuleStorage.set({
          key: this.container.cookieStoreId,
          value: toSave,
        }).then(() => {
          ExitRuleStorage.get(this.container.cookieStoreId)
            .then(res => {
              console.debug(`${this.container.cookieStoreId} saved rules`, res)
            })
        }).catch(e => {
          console.error(`${this.container.cookieStoreId} couldn't save rules`, this.rules, e)
        })
      },
    },
  },
);
