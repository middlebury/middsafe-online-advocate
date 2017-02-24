const forEach = require('./forEach');

const questions = document.querySelectorAll('.questions-list__item');
const answerLinks = document.querySelectorAll('.answers-list__link');

function hideQuestions() {
  forEach(questions, item => {
    item.style.display = 'none';
  });
}

function showQuestion(id) {
  const elem = document.getElementById(id);
  if(elem) {
    elem.style.display = 'block';
    window.scrollTo(0, 0);
  }
}

function handleAnswerClick(e) {
  e.preventDefault();
  const { href } = e.target;
  hideQuestions();
  showQuestion(href.split('#')[1]);
}

function main() {
  if(!answerLinks.length || !questions.length) {
    return false;
  }

  forEach(answerLinks, link => {
    link.addEventListener('click', handleAnswerClick);
  });

  hideQuestions();
  showQuestion(questions[0].id);
}

main();
