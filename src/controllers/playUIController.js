import DOMController from "./domController.js";
import GameController from "./gameController.js";

const PlayUIController = (() => {
  let root;
  let messageEl;
  let playerBoardEl;
  let enemyBoardEl;
  let playerStatusEl;
  let enemyStatusEl;
  let playAgainBtn;

  function init(state, container) {
    root = container;
    buildLayout();
    render(state);
  }

  function buildLayout() {
    root.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.id = "play-wrapper";

    messageEl = document.createElement("div");
    messageEl.id = "message";

    playAgainBtn = document.createElement("button");
    playAgainBtn.id = "play-again";
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.style.display = "none"

    playAgainBtn.addEventListener("click", () => {
      DOMController.switchToPlacement();
    });

    const boards = document.createElement("div");
    boards.id = "boards";

    playerStatusEl = document.createElement("div");
    playerStatusEl.id = "player-ship-status";
    playerStatusEl.classList.add("ship-status");

    playerBoardEl = document.createElement("div");
    playerBoardEl.id = "player-board";
    playerBoardEl.classList.add("board");

    enemyStatusEl = document.createElement("div");
    enemyStatusEl.id = "enemy-ship-status";
    enemyStatusEl.classList.add("ship-status");

    enemyBoardEl = document.createElement("div");
    enemyBoardEl.id = "enemy-board";
    enemyBoardEl.classList.add("board")

    boards.appendChild(playerStatusEl);
    boards.appendChild(playerBoardEl);
    boards.appendChild(enemyBoardEl);
    boards.appendChild(enemyStatusEl);
    wrapper.appendChild(boards);
    wrapper.appendChild(messageEl);
    wrapper.appendChild(playAgainBtn);

    root.appendChild(wrapper);
  }

  function playCell(x=null, y=null) {
    showMessage("");
    const result = GameController.playerAttack(x, y);
    const state = GameController.getState();
    render(state);
    if (state.gameOver) {
      endGame(state);
    } else if (!result.valid) {
      showMessage("invalid move.");
    } else if (state.curPlayer.isComputer) {
      playCell();
    }
  }

  function render(state) {
    renderBoards(state.player1.gameboard, state.player2.gameboard);
    if (!state.gameOver) attachListenersToEnemyBoard();
  }

  function renderBoards(gameboard1, gameboard2) {
    playerBoardEl.innerHTML = "";
    enemyBoardEl.innerHTML = "";

    renderBoard(gameboard1, playerBoardEl, true);
    renderBoard(gameboard2, enemyBoardEl, false);
    
    renderShipStatus(gameboard1, playerStatusEl);
    renderShipStatus(gameboard2, enemyStatusEl);
  }

  function renderBoard(gameboard, container, showShips = false) {
    const board = gameboard.board;
    const size = board.length

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cellData = board[y][x];
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.x = x;
        cell.dataset.y = y;

        if (!cellData.canHit) {
          cell.classList.add(cellData.ship ? "hit" : "miss");
        } else if (cellData.ship && showShips) {
          cell.classList.add("ship");
        }
        
        container.appendChild(cell);
      }
    }
  }

  function renderShipStatus(gameboard, container) {
    container.innerHTML = "";

    const groups = {};
    for (const ship of gameboard.ships) {
      if (!groups[ship.length]) groups[ship.length] = [];
      groups[ship.length].push(ship);
    }

    const lengths = Object.keys(groups)
      .map(Number)
      .sort((a, b) => b - a);

    lengths.forEach(length => {
      const row = document.createElement("div");
      row.classList.add("ship-row");

      groups[length].forEach(ship => {
        const bar = document.createElement("div");
        bar.classList.add("ship-bar");
        if (ship.isSunk()) bar.classList.add("sunk");

        for (let i = 0; i < length; i++) {
          const cell = document.createElement("div");
          cell.classList.add("mini-cell");
          bar.appendChild(cell);
        }

        row.appendChild(bar);
      });
      container.appendChild(row);
    });
  }

  function attachListenersToEnemyBoard() {
    enemyBoardEl.querySelectorAll(".cell").forEach(cell => {
      if (!(cell.classList.contains("hit") || cell.classList.contains(".miss"))) {
        cell.addEventListener("click", (e) => {
          const x = Number(e.target.dataset.x);
          const y = Number(e.target.dataset.y);
          playCell(x, y)
        });
      }
    });
  }

  function showMessage(msg) {
    document.querySelector("#message").textContent = msg;
  }

  function endGame(state) {
    showMessage(`${state.curPlayer.isComputer ? "Computer" : "Player"} wins`);
    playAgainBtn.style.display = "block";
  }

  return { init };
})();

export default PlayUIController;