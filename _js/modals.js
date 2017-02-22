const anime = require('animejs');
const forEach = require('./forEach');

const navLinks = document.querySelectorAll('a[data-modal-id]');
const activeLinkClass = 'fetch-page-active';

const modalBodyClass = 'has-modal';
const modalTopClass = 'modal--is-top';
const modalOpenClass = 'modal--is-open';

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

  modal.innerHTML = `
    <div class="modal__controls">
      <div class="container">
        <a href="#" class="modal__button" data-modal-id="${modalId}">
          <span class="modal__button-icon">&larr;</span> <span class="modal__button-text">Back</span>
        </a>
      </div>
    </div>
    <div class="container">
      <div class="modal__content">${content}</div>
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

  removeActiveLinkClass();
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

  if(activeModalId === id) {
    return;
  }

  activeModalId = id;

  isModalAnimating = true;

  document.body.classList.add(modalBodyClass);

  // remove is-top class from all modals
  forEach(getModals(), modal => modal.classList.remove(modalTopClass));

  modal.classList.add(modalOpenClass);
  modal.classList.add(modalTopClass);

  anime({
    targets: modal,
    translateX: [-modal.offsetWidth, 0],
    elasticity: -1000,
    duration: 800,
    complete: () => {
      isModalAnimating = false;
    }
  });
}

function closeAllModals() {
  forEach(getModals(), modal => closeModal(modal.id));
}

function closeModal(id) {
  const modal = document.getElementById(id);

  activeModalId = null;

  // animate modal closed here
  anime({
    targets: modal,
    translateX: [0, -modal.offsetWidth],
    elasticity: -1000,
    duration: 800,
    complete: () => {
      document.body.classList.remove(modalBodyClass);

      // remove is-top and is-open class
      modal.classList.remove(modalOpenClass, modalTopClass);
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

  const link = e.target;

  // get the url from the link so we can load the content via ajax
  const url = link.href;

  // get the modal id from the data attribute
  const id = createModalId(link.dataset.modalId);

  // remove the active link class from nav links
  removeActiveLinkClass();

  // remove the active link class from nav links
  link.classList.add(activeLinkClass);

  // fetch the page content
  fetchPage(url).then(page => {

    // get the inner content out since the whole html doc gets fetched
    const content = page.querySelector('.js-content');

    // set the inner content of the already created modal
    setModalContent(id, content.innerHTML);

    // open the modal
    openModal(id);

  }).catch(err => {
    console.error(err);
    // window.location.href = url;
  });
}

function main() {
  forEach(navLinks, link => {
    const id = link.dataset.modalId;
    createModal(id);
    link.addEventListener('click', handleLinkClick);
  });
}

main();
