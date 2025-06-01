const randomIndex = (length) => Math.floor(Math.random() * length);

const moveLeftOnRow = (row) => {
  row = row.filter((v) => v != "empty");

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] != row[i + 1]) continue;

    row[i] *= 2;
    row.splice(i + 1, 1);
  }

  // The following code pads the array with "empty" upto length 4.
  // TODO: Improve

  const prevLength = row.length;
  row.length = 4;

  return row.fill("empty", prevLength);
};

class Game {
  spawn2() {
    let emptyIndexes = [];

    for (let i = 0; i < 16; i++) {
      if (this.board[i] == "empty") emptyIndexes.push(i);
    }

    let selectedIndex = emptyIndexes[randomIndex(emptyIndexes.length)];

    this.board[selectedIndex] = 2;
  }

  score() {
    return Math.max(...this.board.filter((v) => v != "empty"));
  }

  // If playing the move does not change the board, it is an invalid move.
  // So we can just play the move and compare the resulting board with our current board.
  // We then repeat this for all 4 moves.
  validMoves() {
    return ["left", "right", "up", "down"].filter((move) => {
      const clone = new Game();
      for (let i = 0; i < 16; i++) clone.board[i] = this.board[i];
      clone._playMove(move);

      for (let i = 0; i < 16; i++) {
        if (clone.board[i] != this.board[i]) return true;
      }

      return false;
    });
  }

  moveLeft() {
    let rows = [];

    for (let i = 0; i < 4; i++) {
      rows.push(moveLeftOnRow(this.board.slice(i * 4, i * 4 + 4)));
    }

    this.board = rows.flat();
  }

  moveRight() {
    let rows = [];

    for (let i = 0; i < 4; i++) {
      rows.push(
        moveLeftOnRow(
          this.board.slice(i * 4, i * 4 + 4).toReversed()
        ).toReversed()
      );
    }

    this.board = rows.flat();
  }

  moveUp() {
    for (let i = 0; i < 4; i++) {
      const arr = [
        this.board[i],
        this.board[i + 4],
        this.board[i + 8],
        this.board[i + 12],
      ];

      const res = moveLeftOnRow(arr);

      this.board[i] = res[0];
      this.board[i + 4] = res[1];
      this.board[i + 8] = res[2];
      this.board[i + 12] = res[3];
    }
  }

  moveDown() {
    for (let i = 0; i < 4; i++) {
      const arr = [
        this.board[i],
        this.board[i + 4],
        this.board[i + 8],
        this.board[i + 12],
      ];

      const res = moveLeftOnRow(arr.toReversed()).toReversed();

      this.board[i] = res[0];
      this.board[i + 4] = res[1];
      this.board[i + 8] = res[2];
      this.board[i + 12] = res[3];
    }
  }

  _playMove(move) {
    if (move == "left") this.moveLeft();
    else if (move == "right") this.moveRight();
    else if (move == "up") this.moveUp();
    else this.moveDown();
  }

  playMove(move) {
    this._playMove(move);
    this.spawn2();
  }

  constructor() {
    this.board = new Array(16).fill("empty");

    this.spawn2();
  }
}

export { Game };
