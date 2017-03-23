const anime = require('animejs');
const forEach = require('./forEach');

const header = document.querySelector('.site-header');

const navLinks = document.querySelectorAll('a[data-modal-id]');
const modals = document.querySelectorAll('.modal');

const activeLinkClass = 'active';

const modalBodyClass = 'has-modal';
const modalTopClass = 'modal--is-top';
const modalOpenClass = 'modal--is-open';

const MODAL_ANIMATION_ELASTICITY = -800;
const MODAL_ANIMATION_DURATION = 800;

let activeModalId = '';
let isModalAnimating = false;

function openModal(id) {
  const modal = document.getElementById(id);

  if (!modal) {
    throw new Error('no modal found');
  }

  // dont open the modal if it's already active or one is animating
  if (activeModalId === id || isModalAnimating) {
    return;
  }

  // set the active modal id so we know what is open
  activeModalId = id;

  isModalAnimating = true;

  // add the global has-modal body class so body overflow can be hidden via css
  document.body.classList.add(modalBodyClass);

  // remove is-top class from all modals
  forEach(modals, modal => modal.classList.remove(modalTopClass));

  // add the modal open class
  modal.classList.add(modalOpenClass);

  // set the modal `is-top` class so it can be layed over any existing modals via css z-index
  modal.classList.add(modalTopClass);

  modal.setAttribute('aria-hidden', false);

  modal.style.transform = 'translateX(-100vw)';

  // animate the modal open from the left based on the modal's width
  anime({
    targets: modal,
    translateX: [-modal.offsetWidth - 50, 0],
    elasticity: MODAL_ANIMATION_ELASTICITY,
    duration: MODAL_ANIMATION_DURATION,
    complete: () => {
      modal.focus();
      isModalAnimating = false;
    },
  });
}

function handleModalCloseButtonClick(e) {
  e.preventDefault();
  closeAllModals();
}

function closeAllModals() {
  forEach(modals, modal => {
    // only animate close the top most modal
    if (modal.id === activeModalId) {
      return closeModal(modal.id);
    }

    // close all other modals by removing the open/top class
    modal.classList.remove(modalTopClass);
    modal.classList.remove(modalOpenClass);
  });
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if (isModalAnimating) {
    return;
  }

  removeActiveLinkClass();

  isModalAnimating = true;

  activeModalId = null;

  document.body.classList.remove(modalBodyClass);

  // animate modal closed here
  anime({
    targets: modal,
    translateX: [0, -modal.offsetWidth - 50],
    elasticity: MODAL_ANIMATION_ELASTICITY,
    duration: MODAL_ANIMATION_DURATION,
    complete: () => {
      // remove is-top and is-open class
      modal.classList.remove(modalOpenClass, modalTopClass);

      modal.setAttribute('aria-hidden', true);

      isModalAnimating = false;
    },
  });
}

// removes the active link class from all page fetcher links
function removeActiveLinkClass() {
  forEach(navLinks, link => {
    link.classList.remove(activeLinkClass);
  });
}

function handleLinkClick(e) {
  // prevent page from going to the url
  e.preventDefault();

  // do nothing if a modal is animating
  if (isModalAnimating) {
    return;
  }

  // get the modal id from the data attribute
  const id = e.target.getAttribute('data-modal-id');

  // close the modals if the intended one to open is already open
  // essentially toggling the open state
  if (id === activeModalId) {
    return closeAllModals();
  }

  // remove all active link styles so the new, single one can be applied
  removeActiveLinkClass();

  // remove the active link class from nav links
  e.target.classList.add(activeLinkClass);

  // open the modal
  openModal(id);
}

function main() {
  forEach(navLinks, link => {
    link.addEventListener('click', handleLinkClick);
  });

  forEach(modals, modal => {
    const btn = modal.querySelector('[data-modal-close-button]');
    btn.addEventListener('click', handleModalCloseButtonClick);
  });

  const headerHeight = header.offsetHeight + 'px';

  forEach(modals, m => m.style.paddingTop = headerHeight);
}

main();
