const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [{
    question: "Koji jezik ne spada u programski jezik?",
    choice1: "JavaScript",
    choice2: "HTML",
    choice3: "C++",
    choice4: "Python",
    answer: 2
},
{
    question: "Koja reprezentacija je osvojila Evropsko prvenstvo u nogometu 2020?",
    choice1: "Italija",
    choice2: "Hrvatska",
    choice3: "Portugal",
    choice4: "Engleska",
    answer: 1
},
{
    question: "Glavni grad Maroka je?",
    choice1: "Kairo",
    choice2: "Dortmund",
    choice3: "Rostov",
    choice4: "Rabat",
    answer: 4
},
{
    question: "Koja valuta se koristi u Rusiji",
    choice1: "Ruska rublja",
    choice2: "Rial",
    choice3: "Konvertibilna marka",
    choice4: "Euro",
    answer: 1
},
{
    question: "Kako se zove glavna glumica u filmu The Intern iz 2015?",
    choice1: "Angelina Jolie",
    choice2: "Anne Hathaway",
    choice3: "Emily Blunt",
    choice4: "Selma Hayek",
    answer: 2
}
];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUSTIONS = 5;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function getNewQuestion() {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() + availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

startGame();
