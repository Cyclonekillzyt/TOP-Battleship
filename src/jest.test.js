import { Ship, Gameboard, Fleet } from "./setup.js";

describe("Ship class", () => {
  it("should return the number of times the ship has been hit", () => {
    const warShip = new Ship(2);
    warShip.Hit();
    expect(warShip.hitCount).toBe(1);
  });

  it("should return true if the ship is sunk", () => {
    const warShip = new Ship(3);
    warShip.Hit();
    warShip.Hit();
    warShip.Hit();
    expect(warShip.isSunk()).toBeTruthy();
  });

  it("should return false if the ship is not sunk", () => {
    const warShip = new Ship(3);
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

  it("should place a ship in a row correctly", () => {
    const board = new Gameboard(10);
    const ship = new Ship(3);
    board.placeShip(ship, "A1", "row");
    expect(ship.position.length).toBe(3);
    expect(board.taken).toEqual(ship.position);
  });

  it("should place a ship in a column correctly", () => {
    const board = new Gameboard(10);
    const ship = new Ship(2);
    board.placeShip(ship, "B1", "column");
    expect(ship.position.length).toBe(2);
    expect(board.taken).toEqual(ship.position);
  });

  it("should not place a ship if it won't fit in the row", () => {
    const board = new Gameboard(10);
    const ship = new Ship(5);
    const result = board.placeShip(ship, "I8", "row");
    expect(ship.position).toEqual([]);
  });

  it("should not place a ship if the position is already taken", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    board.placeShip(ship1, "A1", "row");
    const result = board.placeShip(ship2, "A1", "row");

    expect(result).toEqual({ error: "position taken" });
  });

  it("should attack specific coordinates and register hits and misses", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    const fleet = new Fleet();

    board.placeShip(ship1, "A3", "column");
    board.placeShip(ship2, "B6", "column");

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    expect(board.receiveAttack("A3", fleet)).toBe("its a hit");
    expect(board.receiveAttack("A6", fleet)).toBe("its a miss");
    expect(ship1.hitCount).toBe(1);
  });

  it("should not allow attacking the same coordinate twice", () => {
    const board = new Gameboard(10);
    const ship = new Ship(2);
    const fleet = new Fleet();

    board.placeShip(ship, "A1", "row");
    fleet.addShip(ship);

    board.receiveAttack("A1", fleet);
    const result = board.receiveAttack("A1", fleet);

    expect(result).toBe("Already hit");
  });
});

describe("Fleet class", () => {
  it("should create a fleet and add ships", () => {
    const fleet = new Fleet();
    const battleShip = new Ship(3);
    fleet.addShip(battleShip);
    expect(fleet.ships.length).toBe(1);
  });

  it("should detect when all ships are sunk", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const fleet = new Fleet();

    board.placeShip(ship1, "A1", "column");
    board.placeShip(ship2, "B1", "column");

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    ["A1", "A2", "B1", "B2", "B3"].forEach((coord) => {
      board.receiveAttack(coord, fleet);
    });

    expect(fleet.allShipsSunk()).toBe(true);
  });

  it("should return false if not all ships are sunk", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const fleet = new Fleet();

    board.placeShip(ship1, "A1", "row");
    board.placeShip(ship2, "B1", "row");

    fleet.addShip(ship1);
    fleet.addShip(ship2);

    board.receiveAttack("A1", fleet);
    board.receiveAttack("A2", fleet);

    expect(fleet.allShipsSunk()).toBe(false);
  });
});
