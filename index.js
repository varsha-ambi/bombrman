let arr = [];
let noOfBomb = 10;
let dimension = 9;
let score = 0;
let totalScore = 0;
const bomb = "💣";

const sadEmoji = "🥴";

const placeBomb = () => {
  for (let i = 0; i < noOfBomb; i++) {
    const val = Math.floor(Math.random() * 80);
    if (arr.includes(val)) i--;
    else arr[i] = val;
  }
};

const createGrid = () => {
  let gameContainer = document.getElementById("gameContainer");
  for (let i = 0; i < dimension * dimension; i++) {
    let cell = document.createElement("div");
    cell.classList.add("gameGrid");
    cell.id = i + 1;
    cell.setAttribute("onclick", "handleClick(this)");
    if (arr.includes(i + 1)) cell.classList.add("bombPlaced");
    gameContainer.appendChild(cell);
  }
};
const handleClick = (el) => {
  if (el.classList.contains("selected")) return;
  el.classList.add("selected");

  let flag = false;
  for (let i = 0; i < noOfBomb; i++) {
    if (arr[i].toString() === el.id) {
      el.classList.add("red");
      flag = true;
      gameOver();
      document.getElementById("totalScore").innerHTML = score;
      document.getElementById("gameOverContainer").classList.remove("hide");
    }
  }
  if (flag === false) {
    score++;
    el.classList.add("green");
  }
  if (score === 71) {
    win();
  }
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
};
const win = () => {
  alert("you win");
};
const gameOver = () => {
  let cell = document.getElementsByClassName("gameGrid");
  for (let i = 0; i < dimension * dimension; i++) {
    cell[i].setAttribute("onclick", "");
    if (cell[i].classList.contains("bombPlaced")) {
      cell[i].classList.add("red");
      cell[i].textContent = bomb;
    }
  }
  document.getElementById("smileEmoji").textContent = sadEmoji;
  return;
};

const startNewGame = () => {
  arr = [];
  noOfBomb = 10;
  dimension = 9;
  score = 0;
  placeBomb();
  document.getElementById("gameContainer").innerHTML = "";
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
  document.getElementById("smileEmoji").innerHTML = smileEmoji;

  createGrid();
  document.getElementById("gameOverContainer").classList.add("hide");
};

const exit = () => {
  window.location.reload();
};
placeBomb();
createGrid();
