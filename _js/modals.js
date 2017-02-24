const anime = require('animejs');
const forEach = require('./forEach');

const navLinks = document.querySelectorAll('a[data-modal-id]');
const activeLinkClass = 'fetch-page-active';

const modalBodyClass = 'has-modal';
const modalTopClass = 'modal--is-top';
const modalOpenClass = 'modal--is-open';

const MODAL_ANIMATION_ELASTICITY = -800;
const MODAL_ANIMATION_DURATION = 800;

let activeModalId = '';
let isModalAnimating = false;

// hash to store already fetched page content in
const pageCache = {};

const createModalId = id => `modal-${id}`;

const getModals = () => document.querySelectorAll('.modal');

function createModal(id, content = '') {
  const modal = document.createElement('div');

  const modalId = createModalId(id);
  modal.id = modalId;
  modal.classList.add('modal');

  const header = document.querySelector('.site-header');
  modal.style.paddingTop = header.offsetHeight + 'px';

  modal.innerHTML = `
    <div class="modal__main">
      <div class="modal__controls">
        <div class="container">
          <a href="#" class="modal__button" data-modal-id="${modalId}">
            <span class="modal__button-icon">&larr;</span> <span class="modal__button-text">Back</span>
          </a>
        </div>
      </div>
      <div class="modal__container">
        <div class="container">
          <div class="modal__content">${content}</div>
        </div>
      </div>
    </div>
  `;

  const closeBtn = modal.querySelector('.modal__button');

  closeBtn.addEventListener('click', handleModalCloseButtonClick);

  document.body.appendChild(modal);

  return modal;
}

function handleModalCloseButtonClick(e) {
  e.preventDefault();

  // const id = e.currentTarget.dataset.modalId;

  closeAllModals();
}

function fetchPage(url) {
  if(pageCache[url]) {
    return window.Promise.resolve(pageCache[url]);
  }

  return fetch(url)
    .then(res => res.text())
    .then(text => new window.DOMParser().parseFromString(text, 'text/html'))
    .then(html => {
      pageCache[url] = html;
      return html;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

function openModal(id) {
  const modal = document.getElementById(id);

  // dont open the modal if it's already active or one is animating
  if(activeModalId === id || isModalAnimating) {
    return;
  }

  // set the active modal id so we know what is open
  activeModalId = id;

  isModalAnimating = true;

  // add the global has-modal body class so body overflow can be hidden via css
  document.body.classList.add(modalBodyClass);

  // remove is-top class from all modals
  forEach(getModals(), modal => modal.classList.remove(modalTopClass));

  // add the modal open class
  modal.classList.add(modalOpenClass);

  // set the modal `is-top` class so it can be layed over any existing modals via css z-index
  modal.classList.add(modalTopClass);

  // animate the modal open from the left based on the modal's width
  anime({
    targets: modal,
    translateX: [-modal.offsetWidth - 50, 0],
    elasticity: MODAL_ANIMATION_ELASTICITY,
    duration: MODAL_ANIMATION_DURATION,
    complete: () => {
      isModalAnimating = false;
    }
  });
}

function closeAllModals() {
  forEach(getModals(), modal => {
    // only animate close the top most modal
    if(modal.id === activeModalId) {
      return closeModal(modal.id);
    }

    // close all other modals by removing the open/top class
    modal.classList.remove(modalTopClass);
    modal.classList.remove(modalOpenClass);
  });
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if(isModalAnimating) {
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

      isModalAnimating = false;
    }
  });
}

// sets the inner content of the modal by id
function setModalContent(id, content) {
  const modal = document.getElementById(id);
  const modalContent = modal.querySelector('.modal__content');
  modalContent.innerHTML = content;
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
  if(isModalAnimating) {
    return;
  }

  const link = e.target;

  // get the url from the link so we can load the content via ajax
  const url = link.href;

  // get the modal id from the data attribute
  const id = createModalId(link.getAttribute('data-modal-id'));

  // close the modals if the intended one to open is already open
  // essentially toggling the open state
  if(id === activeModalId) {
    return closeAllModals();
  }

  // remove all active link styles so the new, single one can be applied
  removeActiveLinkClass();

  // remove the active link class from nav links
  link.classList.add(activeLinkClass);

  // fetch the page content
  fetchPage(url).then(page => {

    // get the inner content out since the whole html doc gets fetched
    const content = page.querySelector('.js-content');

    // set the inner content of the already created
    // modal with the fetched page content
    setModalContent(id, content.innerHTML);

    // open the modal
    openModal(id);

  }).catch(err => {
    console.error(err);
    // if page fetched to load, just change the window url to the page
    window.location.href = url;
  });
}

function main() {
  forEach(navLinks, link => {
    const id = link.getAttribute('data-modal-id');
    createModal(id);
    link.addEventListener('click', handleLinkClick);
  });
}

main();
