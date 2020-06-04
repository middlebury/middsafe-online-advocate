// remove no-js class from html elem
var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

// add no-touch class to html if nontouch device
if (!('ontouchstart' in html)) {
  html.classList.add('no-touch');
}

import './decision-tree';
import './modals';

// add top padding to header since it is fixed position and needs content
// under it to be pushed down
const header = document.querySelector('.site-header');
const headerHeight = header.offsetHeight + 'px';
document.body.style.paddingTop = headerHeight;

// hide body when scape button is clicked
const escapeBtn = document.querySelector('.js-escape-button');
escapeBtn.addEventListener('click', () => {
  document.querySelector('body').style.display = 'none';
});
