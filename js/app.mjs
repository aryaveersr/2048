import { Game } from "./game.mjs";

/* Helpers */

const square = (i) => document.getElementById("board").children[i];
const setSquare = (index, content) => {
  square(index).setAttribute("data-content", content);
  square(index).innerHTML = content == "empty" ? "" : content;
};

/* Game instance */
let game = new Game();
let validMoves = game.validMoves();

disableInvalidMoveButtons();
updateScore();
renderBoard();

function disableInvalidMoveButtons() {
  for (let move of ["left", "right", "up", "down"]) {
    document.getElementById(`${move}-btn`).disabled =
      !validMoves.includes(move);
  }
}

function renderBoard() {
  for (let i = 0; i < 16; i++) setSquare(i, game.board[i]);
}

function updateScore() {
  // TODO
}

function checkIfLost() {
  if (validMoves.length == 0) {
    // TODO
  }
}

function play(move) {
  game.playMove(move);

  validMoves = game.validMoves();

  disableInvalidMoveButtons();
  renderBoard();
  updateScore();
  checkIfLost();
}

/* Controls */
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

/* Event listeners */
leftBtn.addEventListener("click", () => play("left"));
rightBtn.addEventListener("click", () => play("right"));
upBtn.addEventListener("click", () => play("up"));
downBtn.addEventListener("click", () => play("down"));
