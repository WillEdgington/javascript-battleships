import Player from "../player.js";
import PlacementController from "./placementController.js";

class TurnNode {
    constructor(player, next = null) {
        this.player = player;
        this.next = next;
    }
}

const GameController = (() => {
  const GameState = {
    PLACEMENT: "placement",
    PLAY: "play"
  };
  let player1;
  let player2;
  let gameOver;
  let curTurn;
  let state = GameState.PLACEMENT

  function initGame() {
    player1 = Player(false);
    player2 = Player(true);

    PlacementController.randomise(player1.gameboard);
    PlacementController.randomise(player2.gameboard);
    
    gameOver = false;
    curTurn = null;
    state = GameState.PLACEMENT;

    return getState();
  }

  function resetGame() {
    if (player1.isComputer) {
      player1 = Player(true);
      PlacementController.randomise(player1.gameboard);
    } else player1.gameboard.reset(false);

    if (player2.isComputer) {
      player2 = Player(true);
      PlacementController.randomise(player2.gameboard);
    } else player1.gameboard.reset(false);

    gameOver = false;
    curTurn = null;
    state = GameState.PLACEMENT;

    return getState();
  }

  function startPlay() {
    curTurn = new TurnNode(player1);
    curTurn.next = new TurnNode(player2);
    curTurn.next.next = curTurn;

    state = GameState.PLAY;
    return getState();
  }

  function playerAttack(x=null, y=null) {
    const attacker = curTurn.player;
    const defender = curTurn.next.player;
    let attack = attacker.attack(defender, x, y)
    if (!attack) return { valid: false };
    
    if (attack.hit) gameOver = defender.gameboard.allShipsSunk();
    else curTurn = curTurn.next;
    
    return {
      valid: true,
      attacker,
      defender,
    };
  }
  
  function getState() {
    return {
      player1,
      player2,
      phase: state,
      get curPlayer() { return curTurn !== null ? curTurn.player : null; },
      get gameOver() { return gameOver; }
    };
  }

  return {
    initGame,
    startPlay,
    playerAttack,
    getState,
    resetGame,
    get attacking() { return curTurn.player; },
    get defending() { return curTurn.next.player; },
    get state() { return state; },
    GameState
  }
})();

export default GameController;