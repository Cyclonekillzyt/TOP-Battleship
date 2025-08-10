export function createShips(ship, playerCoords, computerCoords) {
  const playerCoord = objectLoop(playerCoords);
  const computerCoord = objectLoop(computerCoords);
  const playerShips = ship.playerFleet.ships;
  const computerShips = ship.computerFleet.ships;
  for (let i = 0; i < playerShips.length; i++) {
    ship.playerBoard.placeShip(
      playerShips[i],
      playerCoord[i][0],
      playerCoord[i][1]
    );
    ship.computerBoard.placeShip(
      computerShips[i],
      computerCoord[i][0],
      computerCoord[i][1]
    );
  }
}

const objectLoop = (object) => {
  const objects = [];
  for (const value of Object.values(object)) {
    objects.push(value);
  }
  return objects;
};
