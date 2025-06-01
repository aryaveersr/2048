import { Game } from "./game.mjs";

/* Helpers */

const square = (i) => document.getElementById("board").children[i];
const setSquare = (index, content) => {
  square(index).setAttribute("data-content", content);
  square(index).innerHTML = content == "empty" ? "" : content;
};

/* Elements */
const statusScore = document.getElementById("status-score");

const gameOverDialog = document.getElementById("game-over-dialog");
const gameResult = document.getElementById("game-result");
const gameOverScore = document.getElementById("game-over-score");

/* Game instance */
let game;
let validMoves;
let score;

restartGame();

function restartGame() {
  game = new Game();

  validMoves = game.validMoves();
  score = game.score();

  disableInvalidMoveButtons();
  updateScore();
  renderBoard();
}

function disableInvalidMoveButtons() {
  for (let move of ["left", "right", "up", "down"]) {
    document.getElementById(`${move}-btn`).disabled =
      !validMoves.includes(move);
  }
}

function disableAllButtons() {
  for (let id of ["left-btn", "right-btn", "up-btn", "down-btn"]) {
    document.getElementById(id).disabled = true;
  }
}

function renderBoard() {
  for (let i = 0; i < 16; i++) setSquare(i, game.board[i]);
}

function updateScore() {
  statusScore.innerHTML = score;
}

function checkStatus() {
  if (score != 2048 && validMoves.length != 0) return;

  disableAllButtons();
  gameOverDialog.showModal();
  gameOverScore.innerHTML = score;

  if (score == 2048) {
    gameResult.innerHTML = "Won!";
  } else if (validMoves.length == 0) {
    gameResult.innerHTML = "Lost.";
  }
}

function play(move) {
  game.playMove(move);

  validMoves = game.validMoves();
  score = game.score();

  disableInvalidMoveButtons();
  renderBoard();
  updateScore();
  checkStatus();
}

/* Controls */
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again-btn");

/* Event listeners */
restartBtn.addEventListener("click", () => restartGame());
playAgainBtn.addEventListener("click", () => restartGame());

leftBtn.addEventListener("click", () => play("left"));
rightBtn.addEventListener("click", () => play("right"));
upBtn.addEventListener("click", () => play("up"));
downBtn.addEventListener("click", () => play("down"));

document.addEventListener("keydown", (ev) => {
  if (ev.key == "ArrowUp") upBtn.click();
  else if (ev.key == "ArrowDown") downBtn.click();
  else if (ev.key == "ArrowLeft") leftBtn.click();
  else if (ev.key == "ArrowRight") rightBtn.click();
});
