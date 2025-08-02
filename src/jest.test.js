import {Ship, Gameboard} from "./main";

describe('Ship class', ()=>{
  it('should return the number of times the ship has been hit' , () =>{
    const warShip = new Ship(2);
    warShip.Hit();
    expect(warShip.hitCount).toBe(1)
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
})


describe("Gameboard class", () => {
  it("creates the correct number of coordinates", () => {
    const board = new Gameboard(10);
    expect(board.board.length).toBe(100);
    expect(board.board).toContain("A4");
    expect(board.board).toContain("C5");
  });

  test("should place a ship in a row correctly", () => {
    const board = new Gameboard(10);
    const ship = new Ship(3);
    board.placeShip(ship, "A1", "row");

    expect(ship.position.length).toBe(3);
    expect(board.taken).toEqual(ship.position);
  });

  test("should place a ship in a column correctly", () => {
    const board = new Gameboard(10);
    const ship = new Ship(2);
    board.placeShip(ship, "B1", "column");

    expect(ship.position.length).toBe(2);
    expect(board.taken).toEqual(ship.position);
  });

  test("should not place ship on taken coordinates", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    board.placeShip(ship1, "A1", "row");
    const takenBefore = [...board.taken];

    board.placeShip(ship2, "A1", "row"); // same starting point
    expect(ship2.position.length).toBe(0); // should not place
    expect(board.taken).toEqual(takenBefore); // no new coords added
  });
 
});

