require('./no.js');
require('./decision-tree');
require('./modals');

const header = document.querySelector('.site-header');
const headerHeight = header.offsetHeight + 'px';

document.body.style.paddingTop = headerHeight;

document.querySelector('.js-escape-button').onclick = () => {
  document.querySelector('body').style.display = 'none';
};
