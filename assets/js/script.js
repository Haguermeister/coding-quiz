// Initialize global material variable
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
  correct: ['button3', 'button3', 'button4', 'button3', 'button4'],
};
var i = 0;
//---------------------------------------------------------------------------------------------
// setup containers
var highScore = document.querySelector('.highScore');
var countDown = document.querySelector('.countDown');
var questionsCont = document.querySelector('.questionsCont');
var answersCont = document.querySelector('.answersCont');
var answerList = document.querySelector('.answerList');
var buttonCont = document.querySelector('.buttonCont');
//----------------------------------------------------------------------------------------------
// initialize start page
var startHeader = document.createElement('h1');
var startPrompt = document.createElement('p');
var startButton = document.createElement('button');
startHeader.innerText = 'Coding Quiz Challenge';
startPrompt.innerText =
  'Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score 2 points and time by ten seconds!';
startButton.setAttribute('type', 'button');
startButton.setAttribute('class', 'btn btn-dark');
startButton.innerText = 'Start Quiz';
questionsCont.appendChild(startHeader);
answersCont.appendChild(startPrompt);
buttonCont.appendChild(startButton);
//-----------------------------------------------------------------------------------------------
// setup funtion to clear prompt and setup questions
function setupQuiz() {
  // remove prior prompt
  startButton.innerText = 'Next Question';
  questionsCont.removeChild(startHeader);
  answersCont.removeChild(startPrompt);
  // initialize question and answere elements
  var question = document.createElement('h2');
  var answerListItem1 = document.createElement('li');
  var answerListItem2 = document.createElement('li');
  var answerListItem3 = document.createElement('li');
  var answerListItem4 = document.createElement('li');
  var nextButton = document.createElement('button');
  nextButton.setAttribute('class', 'btn btn-dark');

  // append children to containers / ul
  questionsCont.appendChild(question);
  answerList.appendChild(
    answerListItem1,
    answerListItem2,
    answerListItem3,
    answerListItem4,
  );
  quiz();
}
function quiz() {
  pressed = true;
  if (i < material.questions.length && pressed) {
    // pass question and answers into element
    var quizQuestion = material.questions[i];
    var quizChoices = material.answers[i];
    question.innerText = quizQuestion;
    answerListItem1.innerText = quizChoices[0];
    answerListItem2.innerText = quizAnswer[1];
    answerListItem3.innerText = quizAnswer[2];
    answerListItem4.innerText = quizAnswer[3];
    i++;
    pressed = !pressed;
  }
}
//quiz();
buttonCont.addEventListener('click', quiz);
