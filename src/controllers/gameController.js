import Player from "../player.js";
import PlacementController from "./placementController.js";

class TurnNode {
    constructor(player, next = null) {
        this.player = player;
        this.next = next;
    }
}

const GameController = (() => {
  let player1;
  let player2;
  let gameOver;
  let curTurn;

  function startGame() {
    player1 = Player(false);
    player2 = Player(true);

    PlacementController.randomise(player1.gameboard);
    PlacementController.randomise(player2.gameboard);

    curTurn = new TurnNode(player1);
    curTurn.next = new TurnNode(player2);
    curTurn.next.next = curTurn;
    gameOver = false;
    return getState();
  }

  function playerAttack(x=null, y=null) {
    const attacker = curTurn.player;
    const defender = curTurn.next.player;
    if (!attacker.attack(defender, x, y)) return { valid: false };
    
    const allSunk = defender.gameboard.allShipsSunk();
    if (!allSunk) curTurn = curTurn.next;
    else gameOver = true;
    
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
      get curPlayer() { return curTurn.player; },
      get gameOver() { return gameOver; }
    };
  }

  return {
    startGame,
    playerAttack,
    getState,
    get attacking() { return curTurn.player; },
    get defending() { return curTurn.next.player; }
  }
})();

export default GameController;