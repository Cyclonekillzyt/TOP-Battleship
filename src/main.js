import { handleAttack } from "./handleAttacks";
import { initializePlayers } from "./createPlayers";
import { createShips } from "./createShips";
import { startScreen } from "./dom";

document.addEventListener("DOMContentLoaded", start);

function start() {
  startScreen(initializePlayers, createShips, handleAttack);
}
