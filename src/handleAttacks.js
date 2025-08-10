import { gameOverScreen } from "./dom";
export function handleAttack(players) {
  let Player1Turn = true;
  const computerTiles = document.querySelectorAll(".computer .tiles");
  const playerTiles = document.querySelectorAll(".human .tiles");

  const playerBoard = document.querySelectorAll(".human");
  const computerBoard = document.querySelectorAll(".computer");
  checkTurn(playerBoard, computerBoard, Player1Turn);

  function handleClicks(tile) {
    tile.addEventListener("click", () => {
      const currentBoard = checkTurn(playerBoard, computerBoard, Player1Turn);
      const attackVectors = checkAttackVectors(currentBoard, players);
      const attack = attackVectors.attackFunction(
        tile.value,
        attackVectors.attackFleet
      );
      if (attack === 1) {
        tile.classList.add("hit");
        if(attackVectors.attackFleet.allShipsSunk()){
          gameOverScreen(attackVectors.opponent.name);
        }
        ;
      } else if (attack === 2) {
        tile.classList.add("miss");
        Player1Turn = !Player1Turn;
        checkTurn(playerBoard, computerBoard, Player1Turn);
      }
      checkWinConditions(attackVectors.attackFleet, players);
    });
  }

  playerTiles.forEach((tile) => {
    handleClicks(tile);
  });
  computerTiles.forEach((tile) => {
    handleClicks(tile);
  });
}

function checkTurn(playerBoard, computerBoard, turn) {
  if (turn) {
    playerBoard.forEach((el) => {
      el.style.display = "none";
    });

    computerBoard.forEach((el) => {
      el.style.display = "grid";
    });
    return 1;
  } else {
    playerBoard.forEach((el) => {
      el.style.display = "grid";
    });

    computerBoard.forEach((el) => {
      el.style.display = "none";
    });
    
    return 2;
  }
}

function checkAttackVectors(ships, players) {
  if (ships === 1) {
    const attackFunction = players.computerBoard.receiveAttack.bind(
      players.computerBoard
    );
    const attackFleet = players.computerFleet;
    const opponent = players.player;
    return { attackFleet, attackFunction, opponent };
  } else {
    const attackFunction = players.playerBoard.receiveAttack.bind(
      players.playerBoard
    );
    const attackFleet = players.playerFleet;
    const opponent = players.computerPlayer;
    return { attackFleet, attackFunction, opponent };
  }
}

