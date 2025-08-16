import { createShips } from "./createShips";
import { handleAttack } from "./handleAttacks";
const app = document.getElementById("app");
export function boardLayout(size, coords, type, title = "") {
  // creates  gameBoard
  const board = elements("div");
  board.classList.add("board", type);

  const divs = elements("button", size * size);
  divs.forEach((el, index) => {
    el.classList.add("tiles", type);
    el.value = coords[index];
    board.append(el);
  });
  const boardName = elements("p");
  boardName.classList.add(type);
  boardName.textContent = title;
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  app.append(boardName, board);
  return app;
}

export function gameOverScreen(winner) {
  const gameOver = elements("div");
  gameOver.classList.add("gameOver");
  const declaration = elements("div");
  const p = elements("p");
  p.textContent = `${winner.toUpperCase()} WINS`;
  const StartButton = elements("button");
  StartButton.textContent = "Play Again";
  StartButton.id = "start";
  StartButton.classList.add("start");
  declaration.classList.add("declaration");
  declaration.append(p, StartButton);
  gameOver.append(declaration);
  app.append(gameOver);
}

function placeShips(init) {
  const form = elements("form");
  const buttons = elements("button", 3);
  const classLists = ["row", "reset", "submit"];

  for (let i = 0; i < classLists.length; i++) {
    buttons[i].classList.add(classLists[i]);
    buttons[i].textContent = classLists[i];
    form.append(buttons[i]);
    if (i != 2) {
      buttons[i].type = "button";
    }
  }

  buttons[0].value = 1;
  buttons[0].id = 'orientation';
  app.append(form);
  createShips(init);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAttack(init);
  });
}

export function startScreen(init) {
  const startContainer = elements("form");
  const inputs = elements("input", 2);
  const buttons = elements("button");
  startContainer.classList.add("startScreen");
  const classLists = ["playerName", "boardSize"];
  const placeholders = ["Name Commander", 10];
  const types = ["text", "number"];
  for (let i = 0; i < classLists.length; i++) {
    inputs[i].classList.add(classLists[i]);
    inputs[i].placeholder = placeholders[i];
    inputs[i].type = types[i];
  }
  inputs[1].min = 8;
  inputs[1].max = 10;
  buttons.classList.add("startButton");
  buttons.textContent = "Start";
  buttons.type = "submit";

  startContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    startContainer.style.display = "none";
    if (inputs[1].value == "") {
      inputs[1].value = "10";
    }
    const initPlayers = init(inputs[0].value, inputs[1].value);
    placeShips(initPlayers);
  });
  startContainer.append(inputs[0], inputs[1], buttons);
  app.append(startContainer);
}


function elements(type, amount = 1) {
  if (amount === 1) {
    return document.createElement(type);
  } else {
    let element = [];
    for (let i = 0; i < amount; i++) {
      const e = document.createElement(type);
      element.push(e);
    }
    return element;
  }
}
