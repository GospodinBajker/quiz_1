const highScoresList = document.getElementById("highScoresList");
// const highScores = JSON.parse(localStorage.getItem("highScores"));
const highScoresData = JSON.parse(localStorage.getItem("highScores"));

highScoresList.innerHTML = highScoresData.map((object) => {
  //template literal ` `
  const { name, score } = object;
  return `<li class="high-score inserted-item">${name} - ${score}</li>`;
});
