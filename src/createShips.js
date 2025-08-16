import { checkTurn } from "./handleAttacks";
export async function createShips(ship) {
  const playerBoard = document.querySelectorAll(".human");
  const computerBoard = document.querySelectorAll(".computer");
  const playerTiles = document.querySelectorAll(".human .tiles");
  const computerTiles = document.querySelectorAll(".computer .tiles");
  const orientation = document.getElementById("orientation");
  const playerShips = ship.playerFleet.ships;
  const computerShips = ship.computerFleet.ships;

  placeCOmputerShips(ship, computerShips,computerTiles);

  checkTurn(playerBoard, computerBoard, false);
  checkOrientation(orientation);
  console.log(orientation);
  console.log(ship.playerBoard.placeShip);
  
  for (let i = 0; i < playerShips.length;){
    let currentShip = playerShips[i];
    alert(`Commander Place your ${currentShip.name}`)
    let coords = await waitForTileClick(playerTiles);
    let placed = ship.playerBoard.placeShip(currentShip, coords.value, orientation.value)
    if (placed === 3) { 
      continue;
    }
    console.log(placed.pos);
    markTiles(playerTiles, placed.pos);
    i++;
  }

}


function placeCOmputerShips(ship, computerShips, computerTiles) {
  for (let i = 0; i < computerShips.length;){
    console.log(computerShips[i],computerShips.length);
    let currentShip = computerShips[i];
    let randomCoord = Math.floor(Math.random() * computerTiles.length);
    let randomOrientation = Math.floor(Math.random() * 2) + 1;
    console.log(randomCoord, randomOrientation);
    let placed = ship.computerBoard.placeShip(
      currentShip,
      computerTiles[randomCoord].value,
      randomOrientation
    );
    if (placed === 3) { 
      continue;
    }
    i++;
  }
}

function waitForTileClick(tiles){
  return new Promise((resolve) => {
    function handleClick(e) {
      const tile = e.target;
      tiles.forEach(el => el.removeEventListener('click', handleClick));
      resolve(tile);
    }
    tiles.forEach(el => el.addEventListener('click', handleClick));
  })
}

function checkOrientation(button) {
   button.addEventListener('click', () => {
      if (button.value == 1) {
        button.value = 2;
        button.textContent = 'column'

      }
      else {
        button.value = 1;
        button.textContent = "row";
    
      }
   })
}

function markTiles(tiles, coords) {
  if (tiles.length == 0) return;
  tiles.forEach((tile) => {
    if (coords.includes(tile.value)) {
      tile.classList.add("selected");
    }
    else {
      tile.classList.remove('selected');
    }
  })
}

