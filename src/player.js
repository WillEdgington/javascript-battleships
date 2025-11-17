import Gameboard from "./gameboard.js";

export default function Player(isComputer=false) {
  const gameboard = Gameboard();

  function getRobotXY(opponent) {
    const size = opponent.gameboard.board.length;
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (!opponent.gameboard.board[y][x].canHit);
    return { x, y };
  }
   
  function attack(opponent, x=null, y=null) {
    if (x === null || y === null) {
      if (!isComputer) return false;
      const coords = getRobotXY(opponent);
      x = coords.x;
      y = coords.y;
    }

    return opponent.gameboard.receiveAttack(x, y);
  }

  return {
    isComputer,
    gameboard,
    attack
  };
}