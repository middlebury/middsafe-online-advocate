// remove no-js class from html elem
var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

// add no-touch class to html if nontouch device
if (!('ontouchstart' in html)) {
  html.classList.add('no-touch');
}

require('./decision-tree');
require('./modals');

const header = document.querySelector('.site-header');
const headerHeight = header.offsetHeight + 'px';

document.body.style.paddingTop = headerHeight;

document.querySelector('.js-escape-button').onclick = () => {
  document.querySelector('body').style.display = 'none';
};
