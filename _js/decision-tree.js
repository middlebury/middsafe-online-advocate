const forEach = require('./forEach');

const questions = document.querySelectorAll('.discovery__item');
const answerLinks = document.querySelectorAll('.answers-list__link');
const backButton = document.querySelector('.js-discovery-back-button');

const activeClass = 'discovery__item--is-open';

const previousIds = [];

let activeId = '';

function handleBackButtonClick(e) {
  e.preventDefault();

  const id = previousIds.pop();

  if (id) {
    showQuestion(id);
  }
}

function hideQuestions() {
  forEach(questions, item => {
    item.classList.remove(activeClass);
    item.setAttribute('aria-hidden', true);
  });
}

function showQuestion(id) {
  hideQuestions();

  const elem = document.getElementById(id);

  if (!elem) {
    return;
  }

  document.body.classList.remove(`discovery-item-${activeId}`);
  document.body.classList.add(`discovery-item-${id}`);

  activeId = id;

  elem.classList.add(activeClass);

  elem.setAttribute('aria-hidden', false);

  elem.focus();

  window.scrollTo(0, 0);
}

function handleAnswerClick(e) {
  e.preventDefault();

  const {href} = e.target;
  const id = href.split('#')[1];

  previousIds.push(activeId);

  showQuestion(id);
}

function main() {
  document.body.classList.add('has-discovery');

  if (!answerLinks.length || !questions.length) {
    return false;
  }

  forEach(answerLinks, link => {
    link.addEventListener('click', handleAnswerClick);
  });

  const firstId = questions[0].id;
  showQuestion(firstId);

  backButton.addEventListener('click', handleBackButtonClick);
}

main();
