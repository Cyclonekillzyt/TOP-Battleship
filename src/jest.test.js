import {Ship} from "./main";

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