var forEach = require('./forEach');

var questions = document.querySelectorAll('.questions-list__item');
var answerLinks = document.querySelectorAll('.answers-list__link');

function hideQuestions() {
  forEach(questions, item => {
    item.style.display = 'none';
  });
}

function showQuestion(id) {
  var elem = document.getElementById(id);
  if(elem) {
    elem.style.display = 'block';
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
