export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }
  Hit() {
    return (this.hitCount += 1);
  }
  isSunk() {
    if (this.hitCount === this.length) {
      return true;
    } else {
      return false;
    }
  }
}

export class Gameboard {
  constructor(size) {
    this.row = [];
    this.column = [];
    this.size = size;
  }
  possible_rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  possible_columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  boardSize() {
    let board = [];
    for (let i = 0; i < this.size; i++) {
      const row = this.possible_rows[i];
      for (let j = 0; j < this.size; j++) {
        const col = this.possible_columns[j];
        board.push(String(col + row));
      }
    }

    return board;
  }
}


