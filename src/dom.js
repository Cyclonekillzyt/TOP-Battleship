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
  app.append( boardName, board);
  return app;
}

export function gameOverScreen(winner) {
  const gameOver = elements('div');
  gameOver.classList.add('gameOver');
  const declaration = elements('div')
  const p = elements('p')
  p.textContent = `${winner.toUpperCase()} WINS`;
  const StartButton = elements('button');
  StartButton.textContent = 'Play Again'
  StartButton.id = 'start';
  StartButton.classList.add('start')
  declaration.classList.add('declaration');
  declaration.append(p,StartButton);
  gameOver.append(declaration)
  app.append(gameOver)
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
