import { handleAttack } from "./handleAttacks";
import { initializePlayers } from "./createPlayers";
import { createShips } from "./createShips";


document.addEventListener("DOMContentLoaded", start);

function start() {
  //const playerName = prompt("What is your name");
  //let size = prompt('Chose the size of you battle field')

  const playerName = "him";
  const size = 10;
  const initPlayers = initializePlayers(playerName, size);
  const playerShipCoords = {
    Carrier: ["A1", 1],
    Battleship: ["C5", 1],
    Cruiser: ["F1", 2],
    Submarine: ["D6", 2],
    Destroyer: ["J1", 2],
  };
  const computerShipCoords = {
    Carrier: ["D1", 1],
    Battleship: ["A6", 2],
    Cruiser: ["A1", 2],
    Submarine: ["B4", 2],
    Destroyer: ["I3", 2],
  };

  createShips(initPlayers, playerShipCoords, computerShipCoords);
  handleAttack(initPlayers);
  //player1's turn
  //displayedBoard(true);
  
}
