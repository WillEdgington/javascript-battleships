import GameController from "./gameController.js";

const DOMController = (() => {
  function init() {
    const state = GameController.startGame();
    render(state);
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

  function attachListeners() {
    document.querySelectorAll("#enemy-board .cell").forEach(cell => {
      cell.addEventListener("click", (e) => {
        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);
        playCell(x, y)
      });
    });
  }

  function render(state) {
    renderBoards(state.player1.gameboard, state.player2.gameboard);
    if (!state.gameOver) attachListeners();
  }

  function renderBoards(gameboard1, gameboard2) {
    const p1 = document.querySelector("#player-board");
    const p2 = document.querySelector("#enemy-board");

    p1.innerHTML = "";
    p2.innerHTML = "";

    renderBoard(gameboard1, p1, true);
    renderBoard(gameboard2, p2);
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
          if (cellData.ship) {
            cell.classList.add("hit");
          } else {
            cell.classList.add("miss");
          }
        } else if (cellData.ship && showShips) {
          cell.classList.add("ship");
        }
        
        container.appendChild(cell)
      }
    }
  }

  function showMessage(msg) {
    document.querySelector("#message").textContent = msg;
  }

  return { init };
})();

export default DOMController;