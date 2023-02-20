const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScore')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// e like event ;)
saveHighScore = e => {
// this will prevent form from taking it's default action
    e.preventDefault();
};

const score = {
    score: mostRecentScore,
    name: username.value
};
highScores.push(score);
// simple way to sort this array from highest to lowest
highScores.sort( (a,b) => b.score - a.score);
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/');