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

export function startScreen(init, createShips, handleAttack) {
  const startContainer = elements("form");
  const inputs = elements("input", 2);
  const buttons = elements("button");
  startContainer.classList.add("startScreen");
  inputs[0].classList.add("playerName");
  inputs[0].type = "text";
  inputs[0].placeholder = "Name Commander";
  inputs[1].classList.add("boardSize");
  inputs[1].type = "number";
  inputs[1].min = 8;
  inputs[1].max = 10;
  inputs[1].placeholder = 10;
  buttons.classList.add("startButton");
  buttons.textContent = "Start";
  buttons.type = "submit";


  startContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    startContainer.style.display = "none";
    if(inputs[1].value == ''){
      inputs[1].value = '10';
    }
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

    const initPlayers = init(inputs[0].value, inputs[1].value);
    createShips(initPlayers, playerShipCoords, computerShipCoords);
    handleAttack(initPlayers);
   
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
