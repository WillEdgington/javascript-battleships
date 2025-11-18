import PlacementController from "./placementController.js";
import GameController from "./gameController.js";
import DOMController from "./domController.js";

const PlacementUIController = (() => {
  let root;
  let boardEl;
  let gameboard;
  let draggingShip = null;

  function init(state, container) {
    root = container;
    gameboard = state.player1.gameboard;

    buildLayout();
    renderBoard();
    attachUIEvents();
  }

  function buildLayout() {
    root.innerHtml = "";

    const wrapper = document.createElement("div");
    wrapper.id = "placement-wrapper";

    const controls = document.createElement("div");
    controls.id = "placement-controls"

    const randomBtn = document.createElement("button");
    randomBtn.textContent = "Randomise";
    randomBtn.addEventListener("click", () => {
      PlacementController.randomise(gameboard)
    });

    const playBtn = document.createElement("button");
    playBtn.textContent = "Play";
    playBtn.addEventListener("click", () => {
      DOMController.switchToPlay();
    });

    controls.appendChild(randomBtn);
    controls.appendChild(playBtn);

    boardEl = document.createElement("div");
    boardEl.id = "placement-board";
    boardEl.classList.add("board");

    wrapper.appendChild(boardEl);
    wrapper.appendChild(controls);

    root.appendChild(wrapper);
  }

  function renderBoard() {
    boardEl.innerHTML = "";

    const board = gameboard.board;
    const size = board.length;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cellData = board[y][x];
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.x = x;
        cell.dataset.y = y;
        if (cellData.ship) {
          cell.classList.add("ship")
          cell.draggable = true;
        }
        boardEl.appendChild(cell);
      }
    }
  }

  function attachUIEvents() {
    boardEl.addEventListener("dragstart", handleDragStart);
    boardEl.addEventListener("dragover", handleDragOver);
    boardEl.addEventListener("drop", handleDrop);
  }

  function handleDragStart(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    draggingShip = gameboard.board[y][x].ship
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    if (!draggingShip) return;

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    const horizontal = draggingShip.horizontal;

    PlacementController.tryMoveShip(
      gameboard,
      draggingShip,
      x,
      y,
      horizontal
    );

    draggingShip = null;
    renderBoard();
  }

  return { init };
})();

export default PlacementUIController;