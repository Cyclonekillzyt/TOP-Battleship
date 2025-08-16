import { boardLayout } from "./dom";
import { Player } from "./setup";

export function initializePlayers(playerName, size) {
  //create human player object
  const player = new Player(playerName, "human");
  const playerFleet = player.PlayerFleet();
  while (size > 10 || size < 8) {
    size = prompt("Chose the size of you battle field");
    break;
  }
  const playerBoard = player.PlayerGameboard(size);

  //create computer player object
  const computerPlayer = new Player("player2", "computer");
  const computerFleet = computerPlayer.PlayerFleet();
  const computerBoard = computerPlayer.PlayerGameboard(size);

  const domPlayerBoard = boardLayout(
    size,
    playerBoard.board,
    player.type,
    "Player Board:"
  );
  const domComputerBoard = boardLayout(
    size,
    computerBoard.board,
    computerPlayer.type,
    "Computer Board:"
  );
  return {
    player,
    playerFleet,
    playerBoard,
    computerPlayer,
    computerBoard,
    computerFleet,
    domPlayerBoard,
    domComputerBoard,
  };
}

