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

export function traverseObjects(object, coords) {
  for(const value of Object.values(object)){
    if (value.includes(coords)){
      return value;
    }
  }
  return undefined;
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
    this.miss = [];
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
    if (orientation == 1) {
      let searchRow = traverseObjects(this.rows, coordinates); // searches the rows object and returns a array that contain the coordinates

      let startCoords = searchRow.findIndex((item) => item === coordinates);

      if (searchRow.length - startCoords < ship.length) {
        return "Ship wont fit";
      }

      for (let i = 0; i < ship.length; i++) {
        const coord = searchRow[startCoords];
        if (this.taken.includes(coord)) {
          alert(`Spot already taken ${coord}`);
          return { error: "position taken" };
        }

        coords.push(coord);
        startCoords++;
      }

      this.taken.push(...coords);
      ship.position.push(...coords);
      console.log(this.taken);
    }
    if (orientation == 2) {
      let searchCol = traverseObjects(this.columns, coordinates); // searches the rows object and returns a array that contain the coordinates

      let startCoords = searchCol.findIndex((item) => item === coordinates);
      console.log(searchCol);

      if (searchCol.length - startCoords < ship.length) {
        return "Ship wont fit";
      }

      for (let i = 0; i < ship.length; i++) {
        const coord = searchCol[startCoords];
        if (this.taken.includes(coord)) {
          alert(`Spot already taken ${coord}`);
          return { error: "position taken" };
        }

        coords.push(coord);
        startCoords++;
      }
      this.taken.push(...coords);
      ship.position.push(...coords);
      console.log(this.taken);
    }
    return { pos: ship.position, taken: this.taken };
  }
  //receives attack coordinates and the opponent players fleet and returns 1 if its a hit and 2 if its a miss;
  receiveAttack(coord, fleet) {
    console.log(coord)
    if (!this.attacked.includes(coord)) {
      let attackedShip = fleet.getShipAt(coord);
      if (attackedShip) {
        attackedShip.Hit();
        attackedShip.isSunk();
        this.attacked.push(coord);
        return 1;
      } else {
        this.attacked.push(coord);
        this.miss.push(coord);
        return 2;
      }
    }
    return 3;
  }
}

export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  PlayerFleet() {
    const shipsLength = [5, 4, 3, 3, 2];
    const fleet = new Fleet();
    shipsLength.forEach((length) => {
      const ship = new Ship(length);
      fleet.addShip(ship);
    });
    return fleet;
  }
  PlayerGameboard(size) {
    const board =  new Gameboard(size);
    return board;
  }
}
