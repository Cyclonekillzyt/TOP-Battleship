export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
    this.position = [];
  }
  Hit() {
    console.log("Hit");
    return (this.hitCount += 1);
  }
  isSunk() {
    if (this.hitCount === this.length) {
      console.log("going down");
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

  allShipsSunk() {
    for (let ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}

function traverseObjects(object, coords) {
  let found;
  for (let i = 0; i < Object.keys(object).length; i++) {
    if (object[i].includes(coords)) {
      return (found = object[i]);
    }
  }
  return found;
}
export class Gameboard {
  constructor(size) {
    this.board = [];
    this.rows = {};
    this.columns = [];
    this.size = size;
    this.boardSize();
    this.row();
    this.column();
    this.taken = [];
    this.attacked = [];
    this.miss = []
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
    this.possible_rows.forEach((item, index) => {
      this.rows[index] = [];
      this.board.forEach((coord) => {
        if (coord.includes(`${item}`)) {
          this.rows[index].push(coord);
        }
      });
    });
  }
  column() {
    this.possible_columns.forEach((item, index) => {
      this.columns[index] = [];
      this.board.forEach((coord) => {
        if (coord.includes(`${item}`)) {
          this.columns[index].push(coord);
        }
      });
    });
  }
  placeShip(ship, coordinates, orientation) {
    let coords = [];
    let returnStatement = "";
    if (orientation == "row") {
      let searchRow = traverseObjects(this.rows, coordinates); // searches the rows object and returns a array that contain the coordinates

      let startCoords = searchRow.findIndex((item) => item === coordinates);

      if (searchRow.length - startCoords < ship.length) {
        return 'Ship wont fit' ;
      }

      for (let i = 0; i < ship.length; i++) {
        const coord = searchRow[startCoords];
        if (this.taken.includes(coord)) {
          alert("Spot already taken");
          return { error: "position taken" };
        }

        coords.push(coord);
        startCoords++;
      }

      this.taken.push(...coords);
      ship.position.push(...coords);
    }
    if (orientation == "column") {
      let searchCol = traverseObjects(this.columns, coordinates); // searches the rows object and returns a array that contain the coordinates

      let startCoords = searchCol.findIndex((item) => item === coordinates);
      console.log(searchCol);

      if (searchCol.length - startCoords < ship.length) {
        return "Ship wont fit";
      }

      for (let i = 0; i < ship.length; i++) {
        const coord = searchCol[startCoords];
        if (this.taken.includes(coord)) {
          alert("Spot already taken");
          return { error: "position taken" };
        }

        coords.push(coord);
        startCoords++;
      }
      console.log(coords)
      this.taken.push(...coords);
      ship.position.push(...coords);
      console.log(this.taken, ship.position)
    }
    return { pos: ship.position, taken: this.taken };
  }
  receiveAttack(coord, fleet) {
    if (!this.attacked.includes(coord)) {
      let attackedShip = fleet.getShipAt(coord);
      if (attackedShip) {
        attackedShip.Hit();
        attackedShip.isSunk();
        this.attacked.push(coord);
        return `its a hit`;
      } else {
        this.attacked.push(coord);
        this.miss.push(coord);
        return "its a miss";
      }
    }
    return "Already hit";
  }
}

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  PlayerFleet() {
    Fleet();
  }
  PlayerGameboard() {
    Gameboard(10);
  }
}

const board = new Gameboard(10);
const ship1 = new Ship(3);
const ship2 = new Ship(3);
const fleet = new Fleet();

board.placeShip(ship1, "A10", "row");
board.placeShip(ship2, "B6", "column");

fleet.addShip(ship1);
fleet.addShip(ship2);

board.receiveAttack("A10", fleet);
board.receiveAttack("B10", fleet);
board.receiveAttack("C10", fleet);
board.receiveAttack("B6", fleet);
board.receiveAttack("B7", fleet);
board.receiveAttack("B8", fleet);

console.log(ship1.position, ship2.position);
console.log(board.rows, board.columns)
console.log(fleet.allShipsSunk());
