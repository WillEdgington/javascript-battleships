import GameController from "./gameController.js";

const PlayUIController = (() => {
  let root;
  let messageEl;
  let playerBoardEl;
  let enemyBoardEl;

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

    const boards = document.createElement("div");
    boards.id = "boards";

    playerBoardEl = document.createElement("div");
    playerBoardEl.id = "player-board";
    playerBoardEl.classList.add("board");

    enemyBoardEl = document.createElement("div");
    enemyBoardEl.id = "enemy-board";
    enemyBoardEl.classList.add("board")

    boards.appendChild(playerBoardEl);
    boards.appendChild(enemyBoardEl);
    wrapper.appendChild(boards);
    wrapper.appendChild(messageEl);

    root.appendChild(wrapper);
  }

  function playCell(x=null, y=null) {
    showMessage("");
    const result = GameController.playerAttack(x, y);
    const state = GameController.getState();
    render(state);
    if (state.gameOver) {
      showMessage(`${result.attacker.isComputer ? "Computer" : "Player"} wins`);
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

  function attachListenersToEnemyBoard() {
    enemyBoardEl.querySelectorAll(".cell").forEach(cell => {
      cell.addEventListener("click", (e) => {
        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);
        playCell(x, y)
      });
    });
  }

  function showMessage(msg) {
    document.querySelector("#message").textContent = msg;
  }

  return { init };
})();

export default PlayUIController;