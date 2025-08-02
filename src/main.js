export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
    this.position = [];
  }
  Hit() {
    console.log('Hit')
    return (this.hitCount += 1);
  }
  isSunk() {
    if (this.hitCount === this.length) {
      console.log('going down')
      return true;
    } else {
      return false;
    }
  }
}

export class Fleet {
  constructor() {
    this.ships = [];
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  getShipAt(coord) {
    return this.ships.find((ship) => ship.position.includes(coord));
  }
}

export class Gameboard {
  constructor(size) {
    this.board = [];
    this.rows = [];
    this.columns = [];
    this.size = size;
    this.boardSize();
    this.row();
    this.column();
    this.taken = [];
    this.attacked = [];
  }
  possible_rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  possible_columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  boardSize() {
    for (let i = 0; i < this.size; i++) {
      const row = this.possible_rows[i];
      for (let j = 0; j < this.size; j++) {
        const col = this.possible_columns[j];
        this.board.push(String(col + row));
      }
    }
  }
  row() {
    this.possible_rows.forEach((item) => {
      this.board.forEach((coord) => {
        if (coord.includes(`${item}`)) {
          this.rows.push(coord);
        }
      });
    });
  }
  column() {
    this.possible_columns.forEach((item) => {
      this.board.forEach((coord) => {
        if (coord.includes(`${item}`)) {
          this.columns.push(coord);
        }
      });
    });
  }
  placeShip(ship, coordinates, orientation) {
    if (!this.taken.includes(coordinates)) {
      if (orientation == "row") {
        let startCoords = this.rows.findIndex((item) => item === coordinates);
        for (let i = 0; i < ship.length; i++) {
          let coord = this.rows[startCoords];
          ship.position.push(coord);
          this.taken.push(coord);
          startCoords++;
        }
        let pos = ship.position;
        let taken = this.taken;
        return { pos, taken };
      }
      if (orientation == "column") {
        let startCoords = this.columns.findIndex(
          (item) => item === coordinates
        );
        for (let i = 0; i < ship.length; i++) {
          let coord = this.columns[startCoords];
          ship.position.push(coord);
          this.taken.push(coord);
          startCoords++;
        }
        let pos = ship.position;
        let taken = this.taken;
        return { pos, taken };
      }
      return;
    } else {
      return 'position is taken';
    }
  }
  receiveAttack(coord,fleet) {
    if (!this.attacked.includes(coord)) {
      let attackedShip = fleet.getShipAt(coord);
      if (attackedShip) {
        attackedShip.Hit();
        attackedShip.isSunk();
        this.attacked.push(coord);
        return `its a hit`
      }
      else{
        this.attacked.push(coord);
        return 'its a miss'
      }
    }
    return 'Already hit';
  }
}

