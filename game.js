const questionTitleContainer = document.getElementById("question");
const listOfChoices = Array.from(
  document.getElementsByClassName("choice-text")
);
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const gameInterface = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let currentScore = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    let { results } = loadedQuestions;
    for (let i = 0; i < results.length; i++) {
      let singleQuestion = loadedQuestions.results[i];
      let { correct_answer, incorrect_answers, question } = singleQuestion; // iy objekta single question iyvukli smo ove 3 varijable

      let actualQuestionText = question; // string question
      let answerChoices = [...incorrect_answers];
      let correctAnswerIndex = Math.floor(Math.random() * 4) + 1; // random pozicija tacnog odgovora
      answerChoices.splice(correctAnswerIndex - 1, 0, correct_answer);

      questions[i] = {
        question: actualQuestionText,
        answers: answerChoices,
        correctAnswer: correct_answer,
      };
      console.log(questions[i]);
    }
    // questions = loadedQuestions.results.map(loadedQuestion => {
    //     const formattedQuestion = {
    //         question: loadedQuestion.question
    //     };

    //     const answerChoices = [...loadedQuestion.incorrect_answers];
    //     formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
    //     answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

    //     answerChoices.forEach((choice, index) => {
    //         formattedQuestion['choice' + (index+1)] = choice;
    //     })
    //     return formattedQuestion;
    // });

    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

// Constants
const CORRECT_BONUS = 10;
const MAX_QUSTIONS = 10;

startGame = () => {
  questionCounter = 0;
  currentScore = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  gameInterface.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUSTIONS) {
    localStorage.setItem("mostRecentScore", currentScore);
    //go to the end of page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  // questionCounterText.innerText = questionCounter + " / " + MAX_QUSTIONS;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUSTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  let { question, answers } = currentQuestion;

  questionTitleContainer.innerText = question;

  listOfChoices.forEach((choice, index) => {
    choice.innerText = answers[index];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

listOfChoices.forEach((choice) => {
  choice.addEventListener("click", (clickEvent) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = clickEvent.target;
    console.log(selectedChoice);
    const selectedAnswer = selectedChoice.innerText;

    // ? means if it's true than assign correct, : this means if it's not true than assign incorrect
    // (ternary) syntax
    let isSelectedAnswerCorrect;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      isSelectedAnswerCorrect = true;
    } else {
      isSelectedAnswerCorrect = false;
    }

    const classToApply = isSelectedAnswerCorrect ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);

    const activateEndOfQuestionTimeout = () => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    };

    setTimeout(activateEndOfQuestionTimeout, 2000);
  });
});

incrementScore = (num) => {
  currentScore += num;
  scoreText.innerText = currentScore;
};
