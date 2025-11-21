export function wrapBoardWithCoordinates(boardElements, size) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("board-wrapper");
  
  const blank = document.createElement("div");
  blank.classList.add("coord", "coord-top", "coord-left");
  blank.textContent = "";
  wrapper.appendChild(blank);

  for (let x = 0; x < size; x++) {
    const label = document.createElement("div");
    label.classList.add("coord", "coord-top");
    label.textContent = String.fromCharCode(65 + x);
    wrapper.appendChild(label);
  }

  for (let y = 0; y < size; y++) {
    const label = document.createElement("div");
    label.classList.add("coord", "coord-left");
    label.textContent = y + 1;
    wrapper.appendChild(label);
  }

  wrapper.appendChild(boardElements);

  return wrapper;
}

export function wrapTitleAndMessageBoard(messageEl, titleEl=null) {
  if (titleEl === null) {
    titleEl = document.createElement("h1");
    titleEl.classList.add("title");
    titleEl.textContent = "Battleships";
  }

  const wrapper = document.createElement("div");
  wrapper.appendChild(titleEl);
  wrapper.appendChild(messageEl);
  return wrapper;
}