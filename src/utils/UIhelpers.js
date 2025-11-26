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
  wrapper.id = "app-header";
  return wrapper;
}

export function createFooter() {
  const footer = document.createElement("div");
  footer.id = "app-footer";

  const rules = document.createElement("p");
  rules.classList.add("rules");

  rules.textContent = "This is Battleships. Place your ships, then press Play. Click a cell on the enemy board to fire a shot. Sink all ships to win.";

  const links = document.createElement("div");
  links.classList.add("links")

  const github = document.createElement("a")
  github.href = "https://github.com/WillEdgington";
  github.classList.add("link");
  github.target = "_blank";
  github.textContent = "Github"
  
  links.appendChild(github);
  
  footer.appendChild(rules);
  footer.appendChild(links);

  return footer
}