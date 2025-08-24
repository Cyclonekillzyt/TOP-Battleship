import { gameOverScreen } from "./dom";
import { traverseObjects } from "./setup";
export function handleAttack(players) {
  let Player1Turn;
  const queue = [];
  const computerTiles = document.querySelectorAll(".computer .tiles");
  const playerTiles = document.querySelectorAll(".human .tiles");

  const playerBoard = document.querySelectorAll(".human");
  const computerBoard = document.querySelectorAll(".computer");
  Player1Turn = true;
  nextTurn();

  function nextTurn(code = 0, value = "") {
    checkTurn(playerBoard, computerBoard, Player1Turn);
    if (Player1Turn) {
      computerTiles.forEach((tile) => {
        tile.onclick = () => {
          handleClicks(tile);
        };
      });
    } else {
      setTimeout(() => {
        const tile = handleComputerAttacks(players, playerTiles, code, value, queue);
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
    console.log(tile.value)
    if (attack === 1) {
      if (tile.classList.contains("selected")) {
        tile.classList.remove("selected");
        tile.classList.add("hit");
      } else {
        tile.classList.add("hit");
      }
      nextTurn(attack, tile.value);
      return;
    } else if (attack === 2) {
      tile.classList.add("miss");
      Player1Turn = !Player1Turn;
    }
    if (attackVectors.attackFleet.allShipsSunk()) {
      gameOverScreen(attackVectors.opponent.name);
      return;
    }
    nextTurn(attack, tile.value);
  }
}

function handleComputerAttacks(players, playerTiles, code, value, queue) {
  let attackTile;
  if (queue.length === 0 && code == 2) {
    attackTile = randomCoord(players, playerTiles);
    return attackTile;
  }
  
  console.log(value, code)
  attackTile = smartLogic(players, queue, value, playerTiles, code);
  if (!attackTile) {
    return (attackTile = randomCoord(players, playerTiles));
  }
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

function smartLogic(players, queue, value, playerTiles, code) {
  console.log(value)
  if (!queue.includes(value) && code == 1) {
    queue.push(value);
  }

  const currentElement = queue[0];
  const rows = players.playerBoard.rows;
  const columns = players.playerBoard.columns;
  const attacked = players.playerBoard.attacked;
  const missed = players.playerBoard.miss;

  const attackTile = (value) => {
    return [...playerTiles].find((tile) => (tile.value = value));
  };

  const direction = (orientation, variable) => {
    return orientation[
      orientation.findIndex((item) => item === value) + variable
    ];
  };

  const searchRow = traverseObjects(rows, currentElement);
  const searchCol = traverseObjects(columns, currentElement);
  const left = direction(searchRow, -1)
  const right = direction(searchRow, 1)
  const top = direction(searchCol, -1)
  const bottom = direction(searchCol, 1)
  
  
  console.log(left, right, top, bottom, value, queue)
  if (left && !attacked.includes(left)) {
    return attackTile(left);
  } else if (right && !attacked.includes(right)) {
    return attackTile(right);
  } else if (top && !attacked.includes(top)) {
    return attackTile(top);
  } else if (bottom && !attacked.includes(bottom)) {
    return attackTile(bottom);
  } else {
    queue.shift();
    return null;
  }
}

function randomCoord(players, playerTiles) {
  const playerBoard = players.playerBoard.board;
  const unavailable = players.playerBoard.attacked;
  let attackPosition = Math.floor(Math.random() * playerBoard.length);
  while (unavailable.includes(playerBoard[attackPosition])) {
    attackPosition = Math.floor(Math.random() * playerBoard.length);
  }

  const attackTile = [...playerTiles].find(
    (tile) => tile.value === playerBoard[attackPosition]
  );
  return attackTile;
}
