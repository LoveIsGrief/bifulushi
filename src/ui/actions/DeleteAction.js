import {makeActionSelectedTrigger, setActiveAction} from './utils.js';
import State from '../../State.js';
import ContextualIdentities from '../../ContextualIdentity/index.js';
import {showToast} from '../toast.js';

const $container = document.querySelector('.container-action.action-delete');

const $buttonYes = $container.querySelector('.action-button.yes');
const $buttonNo = $container.querySelector('.action-button.no');

class DeleteAction {

  constructor(state) {
    this.state = state;
    State.addListener(this.update.bind(this));
    this._connect();
  }

  _connect() {
    $buttonYes.addEventListener('click', this.onYes.bind(this));
    makeActionSelectedTrigger($buttonNo);
  }

  update(state){
    this.state = state;
  }

  async onYes() {
    await ContextualIdentities.remove(this.state.actionItem.cookieStoreId);
    showToast('Deleted', 1000);
    setActiveAction();
  }

}


export default new DeleteAction({
  actionItem: State.get('actionItem'),
});
