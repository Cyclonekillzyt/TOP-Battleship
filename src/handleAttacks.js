import { gameOverScreen } from "./dom";
export function handleAttack(players) {
  let Player1Turn;
  const computerTiles = document.querySelectorAll(".computer .tiles");
  const playerTiles = document.querySelectorAll(".human .tiles");

  const playerBoard = document.querySelectorAll(".human");
  const computerBoard = document.querySelectorAll(".computer");
  Player1Turn = true;
  nextTurn();

  function nextTurn() {
    checkTurn(playerBoard, computerBoard, Player1Turn);
    if (Player1Turn) {
      computerTiles.forEach((tile) => {
        tile.onclick = () => {
          handleClicks(tile);
        };
      });
    } else {
      setTimeout(() => {
        const tile = handleComputerAttacks(players, playerTiles);
        handleClicks(tile);
      }, 1000);
    }
  }

  function handleClicks(tile) {
    const currentBoard = checkTurn(playerBoard, computerBoard, Player1Turn);
    const attackVectors = checkAttackVectors(currentBoard, players);
    const attack = attackVectors.attackFunction(
      tile.value,
      attackVectors.attackFleet
    );
    if (attack === 1) {
      if (tile.classList.contains("selected")) {
        tile.classList.remove("selected");
        tile.classList.add("hit");
      } else {
        tile.classList.add("hit");
      }
      nextTurn();
      return;
    } else if (attack === 2) {
      tile.classList.add("miss");
      Player1Turn = !Player1Turn;
    }
    if (attackVectors.attackFleet.allShipsSunk()) {
      gameOverScreen(attackVectors.opponent.name);
      return;
    }

    nextTurn();
  }
}

function handleComputerAttacks(players, playerTiles) {
  let attackTile;
  const playerBoard = players.playerBoard.board;
  const unavailable = players.playerBoard.attacked;
  let attackPosition = Math.floor(Math.random() * playerBoard.length);
  while (unavailable.includes(playerBoard[attackPosition])) {
    handleComputerAttacks(players, playerTiles);
    break;
  }
  playerTiles.forEach((tile) => {
    if (tile.value === playerBoard[attackPosition]) {
      attackTile = tile;
    }
  });
  return attackTile;
}

export function checkTurn(playerBoard, computerBoard, turn) {
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
