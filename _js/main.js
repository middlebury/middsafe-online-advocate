// add polyfills for browsers missing Promise and window.fetch
if(!window.fetch) require('whatwg-fetch');
if(!window.Promise) require('promise/polyfill');

require('./no.js');
require('./decision-tree');
require('./modals');

// quickly hide body when escape button is clicked
document.querySelector('.js-escape-button').onclick = () => {
  document.querySelector('body').style.display = 'none';
};
