import PrefixStorage from './PrefixStorage.js';

/**
 * @typedef ExitRule
 * @property reject Whether exiting the container should be rejected
 * @property pattern Normal string, regex or glob to match against a URL
 */

class ExitRuleStorage extends PrefixStorage {
  constructor() {
    super();
    this.PREFIX = 'exitrule=';
  }
}

export default new ExitRuleStorage();
