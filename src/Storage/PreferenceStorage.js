import PrefixStorage from './PrefixStorage.js';

class PreferenceStorage extends PrefixStorage {
  constructor() {
    super();
    this.PREFIX = 'pref=';
  }
}

export default new PreferenceStorage();
