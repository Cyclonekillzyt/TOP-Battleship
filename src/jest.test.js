import { Ship, Gameboard, Fleet } from "./setup.js";

describe("Ship class", () => {
  it("should return the number of times the ship has been hit", () => {
    const warShip = new Ship(2, "Destroyer");
    warShip.Hit();
    expect(warShip.hitCount).toBe(1);
  });

  it("should return true if the ship is sunk", () => {
    const warShip = new Ship(3, "Cruiser");
    warShip.Hit();
    warShip.Hit();
    warShip.Hit();
    expect(warShip.isSunk()).toBeTruthy();
  });

  it("should return false if the ship is not sunk", () => {
    const warShip = new Ship(3, "Cruiser");
    warShip.Hit();
    warShip.Hit();
    expect(warShip.isSunk()).toBeFalsy();
  });
});


describe("Gameboard class", () => {
  it("creates the correct number of coordinates", () => {
    const board = new Gameboard(10);
    expect(board.board.length).toBe(100);
    expect(board.board).toContain("A4");
    expect(board.board).toContain("C5");
  });

  it("should place a ship in a row (orientation = 1)", () => {
    const board = new Gameboard(10);
    const ship = new Ship(3, "Cruiser");
    const result = board.placeShip(ship, "A1", 1);
    expect(ship.position.length).toBe(3);
    expect(result.pos).toEqual(expect.arrayContaining(ship.position));
  });

  it("should place a ship in a column (orientation = 2)", () => {
    const board = new Gameboard(10);
    const ship = new Ship(2, "Destroyer");
    const result = board.placeShip(ship, "B1", 2);
    expect(ship.position.length).toBe(2);
    expect(result.pos).toEqual(expect.arrayContaining(ship.position));
  });

  it("should not place a ship if it won't fit in the row", () => {
    const board = new Gameboard(10);
    const ship = new Ship(5, "Carrier");
    const result = board.placeShip(ship, "I8", 1);
    expect(result.code).toBe(3);
    expect(ship.position).toEqual([]);
  });

  it("should not place a ship if the position is already taken", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3, "Cruiser");
    const ship2 = new Ship(3, "Cruiser");

    board.placeShip(ship1, "A1", 1);
    const result = board.placeShip(ship2, "A1", 1);

    expect(result.code).toBe(3);
    expect(ship2.position).toEqual([]);
  });

  it("should attack specific coordinates and register hits and misses", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3, "Cruiser");
    const ship2 = new Ship(3, "Cruiser");
    const fleet = new Fleet();

    board.placeShip(ship1, "A3", 2); // vertical
    board.placeShip(ship2, "B6", 2); // vertical

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    expect(board.receiveAttack("A3", fleet)).toBe(1); // hit
    expect(board.receiveAttack("A6", fleet)).toBe(2); // miss
    expect(ship1.hitCount).toBe(1);
  });

  it("should not allow attacking the same coordinate twice", () => {
    const board = new Gameboard(10);
    const ship = new Ship(2, "Destroyer");
    const fleet = new Fleet();

    board.placeShip(ship, "A1", 1);
    fleet.addShip(ship);

    board.receiveAttack("A1", fleet);
    const result = board.receiveAttack("A1", fleet);

    expect(result).toBe(3); // already hit
  });
});

describe("Fleet class", () => {
  it("should create a fleet and add ships", () => {
    const fleet = new Fleet();
    const battleShip = new Ship(3, "Cruiser");
    fleet.addShip(battleShip);
    expect(fleet.ships.length).toBe(1);
  });

  it("should detect when all ships are sunk", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(2, "Destroyer");
    const ship2 = new Ship(3, "Cruiser");
    const fleet = new Fleet();

    board.placeShip(ship1, "A1", 2);
    board.placeShip(ship2, "B1", 2);

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    ["A1", "A2", "B1", "B2", "B3"].forEach((coord) => {
      board.receiveAttack(coord, fleet);
    });

    expect(fleet.allShipsSunk()).toBe(true);
  });

  it("should return false if not all ships are sunk", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(2, "Destroyer");
    const ship2 = new Ship(3, "Cruiser");
    const fleet = new Fleet();

    board.placeShip(ship1, "A1", 1);
    board.placeShip(ship2, "B1", 1);

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    board.receiveAttack("A1", fleet);
    board.receiveAttack("A2", fleet);

    expect(fleet.allShipsSunk()).toBe(false);
  });
});

