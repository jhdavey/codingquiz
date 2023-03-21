//Start score at 100, decrement by 10pts per wrong answer
var score = 0;
var numberOfHighScores = 10;
var leaderBoard = {};
var question = '';
var options = '';
var correctAns = 4;
var count = 0;
var counter = 60;
var introHead = document.getElementById('intro');
var introP = document.getElementById('intro-p');
var titleBox = document.getElementById('titlebox');
var answerList = document.getElementById('answerlist');
var response = document.getElementById('responder');
var timerDisplay = document.getElementById('timerdisplay');
var scoreForm = document.getElementById('scoreform');
var submitButton = document.getElementById('submitbutton');
var highScoreList = document.getElementById('highscorelist');

//Display title on intro page
titleBox.innerText = "JavaScript Coding Quiz Challenge";

//hide answerlist, high score form, rety button, and response div before quiz starts
response.hidden = true;
scoreForm.hidden = true;
highScoreList.hidden = true;

//Start Quiz button hides title div, shows Q1 div
var startBtn = document.getElementById('startbutton');
startBtn.addEventListener('click', startQuiz);

//Function to begin quiz - hide intro elements
function startQuiz() {
    introP.hidden = true;
    startBtn.hidden = true;
    response.hidden = false;
    showPrompts();
    //Start timer at 60 seconds
    startCountdown(counter);
}

//Timer function begins on start quiz
function startCountdown() {
    const interval = setInterval(() => {
        timerDisplay.innerText = "Timer: " + counter;
      counter--;
      //If timer gets to 0, display GAME OVER, send user to enter score function
      if (counter < 0 ) {
        clearInterval(interval);
        gameOver();
      }
    }, 1000);
  }

//Function to show questions and answers based on count
function showPrompts() {    
    var showQuestion = '';
    if (count === questionAnswerArray.length) {
        gameOver();
    } else {
    showQuestion = questionAnswerArray[count].question;
    titleBox.innerText = showQuestion;
    // //Show answer buttons - send to  answerlist div
    var answerOptions = questionAnswerArray[count].options;
    answerOptions.forEach((item) => {
        var answerButton = document.createElement("button");
        answerButton.innerText = item;
        answerList.appendChild(answerButton);
        //check answer on button click
        answerButton.addEventListener('click', e => {
            var check = e.target.innerText;
            if (questionAnswerArray[count].correctAns === check) {
                score += 5;
                response.innerText = "Correct!";
            } else if (count === 11) {
                gameOver();
            } else {
                //If answered wrong subtract 5 seconds from clock
                startCountdown(counter -= 5); //After each run, decreases by additional seconds //TODO
                response.innerText = "Wrong!";
            }
            //Make response disappear after 2 seconds
            setTimeout(() => {
            response.style.display = 'none';
            }, 3000);
            //Reset to next question
            response.style.display = 'block';
            count++;
            answerList.replaceChildren();
            showPrompts();
        })
    })
}}

//Game over screen at end of questions, or time hits 0
function gameOver() {
    //Show game over and final score
    introP.hidden = false;
    answerList.hidden = true;
    titleBox.innerText = 'Game Over!';
    introP.innerText = "Your Score is:\n" + score;
    //Save high score
    scoreForm.hidden = false;
}

//Save score
document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    //Pull scores from LocalStorage
    var pulledBoard = localStorage.getItem('leaderBoard');
    //If no board, save score, add to leaderboard, send to localStorage
    if (!pulledBoard) {
        var initials = document.getElementById('initials').value;
        leaderBoard[initials] = score;
        window.localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
        showScores();
    } else {
        //If leaderboard exists, pull board update, send back to localStorage
        leaderBoard = JSON.parse(pulledBoard);
        var initials = document.getElementById('initials').value;
        leaderBoard[initials] = score;
        window.localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
        showScores();
        }
    }
);

//Hide submit score form, Sort leaderboard, Show leaderboard & retry button
function showScores() {
    scoreForm.hidden = true;
    introP.hidden = true;
    highScoreList.hidden = false;
    titleBox.innerText = 'HIGH SCORES';
    leaderBoard = JSON.stringify(leaderBoard);
    // console.log(typeof leaderBoard);
    // console.log(leaderBoard);
    highScoreList.innerText = leaderBoard;
    // var topTen = leaderBoard.splice(0, 10);

    // highScoreList.innerText = leaderBoard.join('\n');
    //SORT???
}




//Question & answer array
questionAnswerArray = [
{   question: "1. Where does JavaScript live?",
    correctAns: "Client-side",
    options: ["Client-side", "Server-side", "In an App", "In Silicon Valley" ]
},
{
    question: "2. Which of the following is a disadvantage of using JavaScript?",
    correctAns: "All of the above.",
    options: ["Client-side JavaScript does not allow the reading or writing of files.", "JavaScript can not be used for Networking applications because there is no such support available.", "JavaScript doesn't have any multithreading or multiprocess capabilities.", "All of the above." ]
},
{
    question: "3. Which of the following is a valid type of function javascript supports?",
    correctAns: "Both of the above.",
    options: ["Named function", "Anonymous function", "Both of the above.", "None of the above." ]
},
{
    question: "4. Which of the following type of variable is visible only within a function where it is defined?",
    correctAns: "Local variable",
    options: ["Global variable", "Local variable", "Const variable", "None of the above." ]
},
{
    question: "5. Which built-in method returns the characters in a string beginning at the specified location?",
    correctAns: "substr()",
    options: ["substr()", "getSubstring()", "slice()", "None of the above." ]
},
{
    question: "6. Which of the following function of String object combines the text of two strings and returns a new string?",
    correctAns: "concat()",
    options: ["add()", "merge()", "concat()", "append()" ]
},
{
    question: "7. Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
    correctAns: "search()",
    options: ["concat()", "match()", "replace()", "search()" ]
},
{
    question: "8. Which of the following function of String object creates a string to be displayed in a big font as if it were in a \<big\> tag?",
    correctAns: "big()",
    options: ["anchor()", "big()", "blink()", "italics()" ]
},
{
    question: "9. Which of the following function of String object causes a string to be displayed in the specified size as if it were in a \<font size = 'size'\> tag?",
    correctAns: "fontsize()",
    options: ["fixed()", "fontcolor()", "fontsize()", "bold()" ]
},
{
    question: "10. Inside which HTML element do we put the JavaScript?",
    correctAns: "<script>",
    options: ["<javascript>", "<scripting>", "<js>", "<script>" ]
}
];

