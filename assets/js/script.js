// Initialize global variables
material = {
  questions: [
    'Commonly used data types DO NOT include :',
    'The condition in an if / else statement is enclosed with _________.',
    'Arrays in Javascript can be used to store _________.',
    'String values must be enclosed within _________ when being assigned to variables.',
    'A very useful tool used during development and debugging for printing content to the debugger is :',
  ],
  answers: [
    ['A. Strings', 'B. Booleans', 'C. Alerts', 'D. Numbers'],
    [
      'A. Qoutes',
      'B. Curly Brackets',
      'C. Parenthesis',
      'D. Square Brackets',
    ],
    [
      'A. Number and Strings',
      'B. Other Arrays',
      'C. Booleans',
      'D. All of the Above',
    ],
    ['A. Commas', 'B. Curly Brackets', 'C. Quotes', 'D. Parenthesis'],
    [
      'A. Javascript',
      'B. Terminal/Bash',
      'C. For Loops',
      'D. Console Log',
    ],
  ],
  correct: ['c', 'c', 'd', 'c', 'd'],
};
var i = 0;
var time = 60;
var scoreArray = [];

//---------------------------------------------------------------------------------------------
// setup containers / elements
var highScore = document.querySelector('.highScore');
var countDown = document.querySelector('.countDown');
var questionsCont = document.querySelector('.questionsCont');
var answerCont = document.querySelector('.answerCont');
var buttonGroup = document.querySelector('.btn-group');
var buttonCont = document.querySelector('.buttonCont');
var question = document.createElement('h2');
var labelListItem1 = document.getElementById('label1');
var labelListItem2 = document.getElementById('label2');
var labelListItem3 = document.getElementById('label3');
var labelListItem4 = document.getElementById('label4');
var radiobtn1 = document.getElementById('btn1');
var radiobtn2 = document.getElementById('btn2');
var radiobtn3 = document.getElementById('btn3');
var radiobtn4 = document.getElementById('btn4');
var form = document.querySelector('form');

radiobtn1.style.display = "none";
radiobtn2.style.display = "none";
radiobtn3.style.display = "none";
radiobtn4.style.display = "none";
var nextButton = document.createElement('button');
nextButton.setAttribute('type', 'submit');
//----------------------------------------------------------------------------------------------
// initialize start page
var startPrompt = document.createElement('p');
var anchor = document.querySelector('a');
var startButton = document.createElement('button');
var score = document.createElement('li');
var timeLeft = document.createElement('li');
var ul = document.getElementById("myUl");
function initialize() {
  question.innerText = 'Coding Quiz Challenge';
  startPrompt.innerText =
    'Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score 2 points and time by ten seconds!';
  startButton.setAttribute('type', 'button');
  startButton.setAttribute('class', 'btn btn-dark');
  startButton.innerText = 'Start Quiz';
  score.innerText = 0;
  timeLeft.innerText = 60;
  questionsCont.appendChild(question);
  buttonGroup.appendChild(startPrompt);
  buttonCont.appendChild(startButton);
  countDown.appendChild(score);
  countDown.appendChild(timeLeft);
  retrieveScores();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  startPrompt.style.display = 'inline-block';
  anchor.innerHTML = 'High Score';
  anchor.setAttribute('onclick', 'highScoreFunction(); return false;')
}
initialize();
//-----------------------------------------------------------------------------------------------
inputDiv = document.createElement('div');
inputForm = document.createElement('form');
inputButton = document.createElement('button');
inputInput = document.createElement('textarea');
inputDiv.setAttribute('class', 'input-group-append');
inputForm.setAttribute('class', 'input-group');
inputButton.setAttribute('class', 'btn btn-dark');
inputButton.innerHTML = "Add Initials";
inputInput.setAttribute('placeholder', 'Initials');
inputInput.setAttribute('class', 'form-control');
inputDiv.appendChild(inputButton);
inputForm.appendChild(inputInput);
inputForm.appendChild(inputDiv);

//-----------------------------------------------------------------------------------------------
// setup function to clear prompt and setup questions
function setupQuiz() {
  anchor.style.display = 'none';
  anchor.innerText = 'High Score'
  score.innerText = 0;
  i = 0;
  time = 60;
  timeLeft.innerText = 60;
  timerStart();
  // remove prior prompt
  buttonCont.removeChild(startButton);
  while (questionsCont.firstChild) {
    questionsCont.removeChild(questionsCont.firstChild);
  }
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  questionsCont.appendChild(question);
  startPrompt.style.display = 'none';
  // initialize question and answere elements
  radiobtn1.style.display = "inline-block";
  radiobtn2.style.display = "inline-block";
  radiobtn3.style.display = "inline-block";
  radiobtn4.style.display = "inline-block";
  nextButton.setAttribute('class', 'btn btn-dark');
  nextButton.innerText = 'Next Question';

  // append children to containers / ul
  buttonCont.appendChild(nextButton);

  var quizQuestion = material.questions[0];
  var quizChoices = material.answers[0];
  question.innerText = quizQuestion;
  labelListItem1.innerText = quizChoices[0];
  labelListItem2.innerText = quizChoices[1];
  labelListItem3.innerText = quizChoices[2];
  labelListItem4.innerText = quizChoices[3];
  return;
}
function quiz(event) {
  var data = new FormData(form);
  var output = "";
  for (const entry of data) {
    output = entry[1];
  };
  if (output) {
    if (output == material.correct[i]) {
      score.innerText = parseInt(score.innerText) + 5;
    }
    else {
      score.innerText = parseInt(score.innerText) - 2;
      time -= 10;
    }
    i++;
    var quizQuestion = material.questions[i];
    var quizChoices = material.answers[i];
    if (i < material.questions.length) {
      // pass question and answers into element
      question.innerText = quizQuestion;
      labelListItem1.innerText = quizChoices[0];
      labelListItem2.innerText = quizChoices[1];
      labelListItem3.innerText = quizChoices[2];
      labelListItem4.innerText = quizChoices[3];
    }
  }
  event.preventDefault();
  return;
}
function resetQuiz() {
  timeLeft.textContent = 0;
  question.innerText = "Final Score: " + score.innerText;
  buttonCont.removeChild(nextButton);
  radiobtn1.style.display = "none";
  radiobtn2.style.display = "none";
  radiobtn3.style.display = "none";
  radiobtn4.style.display = "none";
  questionsCont.appendChild(inputForm);
  anchor.style.display = 'inline-block';
  return;
}


function retrieveScores() {
  retrieveData = localStorage.getItem('highScore');
  if (retrieveData == null) {
    scoreArray = [];
  } else {
    scoreArray = JSON.parse(retrieveData);
  }
  return;
}
function timerStart() {
  var downloadTimer = setInterval(function () {
    time--;
    timeLeft.textContent = time;
    if (time <= 0 || i >= material.questions.length) {
      resetQuiz();
      clearInterval(downloadTimer);
    }
  }, 1000);
  return;
}
function addInitials(event) {
  var scoreObj = {}
  scoreObj.score = score.innerText;
  scoreObj.name = inputInput.value;

  scoreArray.push(scoreObj);
  localStorage.setItem("highScore", JSON.stringify(scoreArray));
  highScoreFunction();
}
function highScoreFunction() {
  highScoreList = document.createElement('ul');
  anchor.innerHTML = 'Home';
  anchor.setAttribute('onclick', 'initialize(); return false;')
  startButton.innerText = 'Start New Quiz';
  buttonCont.appendChild(startButton);
  while (questionsCont.firstChild) {
    questionsCont.removeChild(questionsCont.firstChild);
  }
  question.innerHTML = 'High Score:';
  questionsCont.appendChild(question);
  startPrompt.style.display = 'none';
  radiobtn1.style.display = "none";
  radiobtn2.style.display = "none";
  radiobtn3.style.display = "none";
  radiobtn4.style.display = "none";
  scoreArray.sort(function (a, b) { return a.score - b.score });
  scoreArray = scoreArray.reverse();
  scoreArray.forEach(function (a) {
    var li = document.createElement("li");
    var num = a.score.toString();
    var name = a.name.toString();
    text = 'Initials: ' + name + ' Score: ' + num;
    li.innerText = text;
    console.log(text);
    ul.appendChild(li);
  });

}
startButton.addEventListener('click', setupQuiz);
form.addEventListener('submit', quiz);
inputButton.addEventListener('click', addInitials);

