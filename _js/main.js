var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

const forEach = (items, cb) => {
  var itemsCount = items.length;
  for(var i = 0; i < itemsCount; i++) {
    cb(items[i], i);
  }
};

var $ = selector => document.querySelector(selector);
var $$ = selector => document.querySelectorAll(selector);

var questions = $$('.questions-list__item');
var answerLinks = $$('.answers-list__link');

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

forEach(answerLinks, link => {
  link.addEventListener('click', handleAnswerClick);
});

hideQuestions();
showQuestion(questions[0].id);
