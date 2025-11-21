import GameController from "./gameController.js";
import PlayUIController from "./playUIController.js";
import PlacementUIController from "./placementUIController.js";

const DOMController = (() => {
  GameController.initGame();
  function init() {
    const app = document.querySelector("#app");
    const state = GameController.getState();

    if (state.phase === GameController.GameState.PLACEMENT) {
      PlacementUIController.init(state, app);
    } else {
      PlayUIController.init(state, app);
    }
  }

  function switchToPlay() {
    GameController.startPlay();
    init();
  }

  function switchToPlacement() {
    GameController.resetGame();
    init();
  }

  return { init, switchToPlay, switchToPlacement };
})();

export default DOMController;