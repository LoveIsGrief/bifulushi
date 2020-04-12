import {makeActionSelectedTrigger, setActiveAction} from './utils';
import State from '../../State';
import ContextualIdentities from '../../ContextualIdentity';
import {COLORS, ICONS} from '../../ContextualIdentity';

const $container = document.querySelector('.container-action.action-create-edit');
const $colorSelector = $container.querySelector('.color-selector');
const $iconSelector = $container.querySelector('.icon-selector');

const $input = $container.querySelector('input');
const $buttonDone = $container.querySelector('.action-button.done');
const $buttonCancel = $container.querySelector('.action-button.cancel');

class CreateEditAction {

  constructor(state) {
    this.state = state;
    State.addListener(this.update.bind(this));

    this.fieldGetters = {};

    this._initFieldGetters();
    this._fillColors();
    this._fillIcons();
    this._connect();
    this.render();
  }

  _initFieldGetters() {
    this.fieldGetters['name'] = () => $input.value.trim();
    this.fieldGetters['color'] = this._getSelected.bind(this, $colorSelector);
    this.fieldGetters['icon'] = this._getSelected.bind(this, $iconSelector);
  }

  _getSelected($selector) {
    let selected = $selector.querySelector('.selected');
    if (selected) {
      selected = selected.dataset.value;
    }
    return selected;
  }

  _connect() {
    $input.addEventListener('keyup', this.onFieldChanged.bind(this));
    $buttonDone.addEventListener('click', this.onDone.bind(this));
    makeActionSelectedTrigger($buttonCancel);

    // Handle events in the selectors
    this._connectSelector($colorSelector, this._updateIconColor.bind(this));
    this._connectSelector($iconSelector);
  }

  /**
   * Marks an item in a selector as selected
   *
   * @param $selector {HTMLElement}
   * @param finalAction {Function?} Optionally do something after events have been handled
   * @private
   */
  _connectSelector($selector, finalAction) {
    $selector.addEventListener('click', (event) => {
      const $el = event.target;
      if (!$el.classList.contains('item') || $el.classList.contains('selected')) {
        return;
      }
      this._selectItem($el);
      this.onFieldChanged();
      finalAction && finalAction($el);
    });
  }

  _fillColors() {
    for (let color of COLORS) {
      let $colorButton = document.createElement('button');
      $colorButton.classList.add('item');
      $colorButton.dataset.value = color;
      $colorButton.style.backgroundColor = color;

      $colorSelector.appendChild($colorButton);
    }
  }

  _fillIcons() {
    this._createIconColorStyles();
    for (let icon of ICONS) {
      // Icon container contains a background set in CSS
      let $iconContainer = document.createElement('div');
      $iconContainer.classList.add('item');
      $iconContainer.dataset.value = icon;

      let $icon = document.createElement('div');
      $icon.classList.add('icon');
      $icon.style = `
        background-image: url(resource://usercontext-content/${icon}.svg);
      `;
      $iconContainer.appendChild($icon);

      $iconSelector.appendChild($iconContainer);
    }
  }

  /**
   * Generate a style that allows using a data-attribute to set the icon color
   * @private
   */
  _createIconColorStyles() {
    let $style = document.createElement('style');
    for (let color of COLORS) {
      $style.innerHTML += `
        .icon-selector[data-color="${color}"]{
          --icon-color: ${color};
        }
      `;
    }
    $container.appendChild($style);
  }

  selectItem($selector, value){
    const $toSelect = $selector.querySelector(`.item[data-value="${value}"]`);
    if($toSelect){
      this._selectItem($toSelect);
    }
  }

  _selectItem($el) {
    for (let $item of $el.parentElement.querySelectorAll('.item')) {
      $item.classList.remove('selected');
    }
    $el.classList.add('selected');
  }

  _updateIconColor() {
    $iconSelector.dataset.color = this.fieldGetters.color();
  }

  async create() {
    return ContextualIdentities.create(this.getObject());
  }

  async save() {
    return ContextualIdentities.update(
        this.state.actionItem.cookieStoreId,
        this.getObject(),
    );
  }

  canSave() {
    let saveWorthy = false;
    for (let fieldName of Object.keys(this.fieldGetters)) {
      let value = this.fieldGetters[fieldName]();
      if(value === undefined || value === ''){
        saveWorthy = false;
        break;
      }
      saveWorthy |= (this.state.actionItem ?
              this.state.actionItem[fieldName] !== value :
              true
      );
    }
    return saveWorthy;
  }

  getObject() {
    return Object.keys(this.fieldGetters).reduce((acc, curr) => {
      acc[curr] = this.fieldGetters[curr]();
      return acc;
    }, {});
  }

  update(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    let name = '';
    let color = COLORS[0];
    let icon = ICONS[0];

    if (this.state.actionItem) {
      let identity = this.state.actionItem;
      name = identity.name;
      color = identity.color;
      icon = identity.icon;
    }
    $input.value = name;

    // The actual render update
    this.selectItem($colorSelector, color);
    this.selectItem($iconSelector, icon);
    this._updateIconColor();
    this.onFieldChanged();
  }

  onFieldChanged() {
    $buttonDone.disabled = !this.canSave();
  }

  async onDone() {
    if (!this.canSave()) {
      return;
    }
    await (this.state.actionItem ? this.save() : this.create());
    setActiveAction();
  }

}


export default new CreateEditAction({
  actionItem: State.get('actionItem'),
});
