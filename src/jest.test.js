import {Ship, Gameboard, Fleet} from "./main";

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

  it("should throw an error if the position is taken", () => {
    const board = new Gameboard(10);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    board.placeShip(ship1, "A1", "row");

    
    expect(board.placeShip(ship2, "A1", "row")).toEqual('position is taken');
  });

  it('should attack specific coordinates and check if a shipt has been hit',()=>{
    const board = new Gameboard(10);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    const fleet = new Fleet();

    board.placeShip(ship1, 'A3', 'column');
    board.placeShip(ship2, "B6", "column");

    fleet.addShip(ship1);
    fleet.addShip(ship2);


   expect(board.receiveAttack('A3', fleet)).toBe('its a hit')
   expect(board.receiveAttack("A6", fleet)).toBe("its a miss");
   expect(ship1.hitCount).toEqual(1);
  })
 
});

describe('Fleet class', () =>{
  it('should create an Object named fleet to house all the ships',() =>{
    const fleet = new Fleet();
    const battleShip = new Ship();
    fleet.addShip(battleShip);
    expect(fleet.ships.length).toEqual(1)
  })
})

