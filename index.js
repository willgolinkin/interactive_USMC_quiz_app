let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion () {
    if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}">
        <h2 class="questions">${STORE[questionNumber].question}</h2>
            <form>
                <fieldset>
                    <label class="answerOption">
                        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
                        <span>${STORE[questionNumber].answers[0]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
                        <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
                        <span>${STORE[questionNumber].answers[2]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
                        <span>${STORE[questionNumber].answers[3]}</span>
                    </label>
                    <button type="submit" class="submitButton">Submit</button>
                </fieldset>
            </form>
        </div>`;
    } else {
      renderResults();
      restartQuiz();
      $('.questionNumber').text(5);
    }
}


//increment question number
//need to stop changing questionNumber when five questions are answered
function changeQuestionNumber() {
    //if (questionNumber < STORE.length) {
        questionNumber ++;
        $('.questionNumber').text(questionNumber+1);
    //} else {
     //   renderResults ();
    // restartQuiz ();
    //}
    
}

//increment score
function changeScore() {
    score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function(event) {
        $('.quizStart').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

//render question in DOM
function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
    $('form').on('submit', function (event) {
        console.log('userSelectAnswer');
        //prevent default; don't reload page
        event.preventDefault();
        //radio button is checked/selected
        let selected = $('input:checked');
        //return value of w/e is checked
        let answer = selected.val();
        //return value of correctAnswer from STORE
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer == correctAnswer) {
          //add 'correct' to parent class ?label answerOption or add class to input?
          selected.parent().addClass('correct');
          ifAnswerIsCorrect();
        } else {
          selected.parent().addClass('wrong');
          ifAnswerIsWrong();
        }
    });
}

function ifAnswerIsCorrect () {
    //provide user correct feedback
    //increment the score
    console.log('ifAnswerIsCorrect');
    userAnswerFeedbackCorrect();
    updateScore();
}

function ifAnswerIsWrong () {
    //provide user wrong feedback
    console.log('ifAnswerIsWrong');
    userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
    //find answer in STORE
    //add the feedback to html
    console.log('answer correct');
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    //add feedback to html form
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <p><b>You got it right!</b></p>
    <button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
    //find answer in STORE
    //add wrong feedback to html 
    console.log('answer incorrect');
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    //add feedback to html form
    $('.questionAnswerForm').html(`<div class="wrongFeedback">
    <p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p>
    <button type=button class="nextButton">Next</button></div>`);
}

//update score
function updateScore () {
    changeScore ();
    $('.score').text(score);
}

//when quiz is over this is html for the page
function renderResults () {
    //if got more than 3 right, then display a success message
    /*if (score >= 3) {
        console.log(passed);
        $('.questionAnswerForm').html(`<div class="results correctFeedback">
        <h3>You know your Corps!</h3>
        <img src="https://i.imgur.com/qwWsa3Cb.jpg" alt="SemperFi"/>
        <p>You got ${score} / 5</p>
        <p>Semper Fidelis!</p>
        <button class="restartButton">Restart Quiz</button>
        </div>`);
    //if less than 3, display a fail message
    } else {
        console.log(failed);
        $('.questionAnswerForm').html(`<div class="results correctFeedback">
        <h3>Back to Boot Camp!</h3>
        <img src="https://i.imgur.com/XsuL3alb.jpg" alt="drill_instructor"/>
        <p>You got ${score} / 5</p>
        <p>History is our religion so study up!</p>
        <button class="restartButton">Restart Quiz</button>
        </div>`);
    }
    */
   if (score >= 3) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
    <h3>You're on fire!</h3>
    <img src="https://i.imgur.com/qwWsa3Cb.jpg" alt="drill_instructor"/>
    <p>You got ${score} / 10</p>
    <p>You're ready to plan your backpacking trip!</p>
    <button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
    <h3>You might want to stick with car camping</h3>
    <img src="https://i.imgur.com/XsuL3alb.jpg" alt="drill_instructor"/>
    <p>You got ${score} / 10</p>
    <p>With more camping and outdoor experience you'll be able to pass this quiz in no time</p>
    <button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when user clicks next question
function renderNextQuestion () {
    console.log('going to next question');
    $('main').on('click', '.nextButton', function(event) {
        changeQuestionNumber();
        renderQuestion();
        userSelectAnswer();
    });
}

//restart quiz- reloads page to start quiz over
function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
        console.log ('reloading quiz');
        //reloads the current resource, like the refresh button
        location.reload(true);
    });
}

//run quiz functions
function createQuiz () {
    startQuiz ();
    renderQuestion ();
    userSelectAnswer ();
    renderNextQuestion ();
}

$(createQuiz);
