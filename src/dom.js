const app = document.getElementById("app");
export function layout(size, coords, type, title = ''){
  const board = elements("div");
  board.classList.add("board", type);

  const divs = elements("button", size * size);
  divs.forEach((el, index) => {
    el.classList.add('tiles', type);
    el.value = coords[index];
    board.append(el);
  });
  const boardName = elements('p'); 
  boardName.classList.add(type);
  boardName.textContent = title;
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  app.append(boardName, board);
  return board;
};

export function editLayout(){
  
}

function elements(type, amount = 1) {
  if(amount === 1) {
    return document.createElement(type)
  }else{
  let element = [];
  for (let i = 0; i < amount; i++) {
    const e = document.createElement(type);
    element.push(e);
  }
  return element;}
}

