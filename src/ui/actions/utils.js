export function makeActionSelectedTrigger($el, newAction) {
  $el.addEventListener('click', function () {
    $el.dispatchEvent(new CustomEvent('action-selected', {
      detail: {newAction},
    }));
  });
}

export function setActiveAction(newAction) {
  const $action = document.querySelector('.container-action.active');
  $action && $action.classList.remove('active');
  if (newAction) {
    const $nextAction = document.querySelector(`.container-action.action-${newAction}`);
    $nextAction.classList.add('active');
    document.querySelector('body').classList.add('noscroll');
  } else {
    document.querySelector('body').classList.remove('noscroll');
  }
}
