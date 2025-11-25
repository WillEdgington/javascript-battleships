import Gameboard from "./gameboard.js";

export default function Player(isComputer=false) {
  const gameboard = Gameboard();
  let lastAttack = null;
  let queuedAttacks = [];
  let hits = [];

  function checkCanHit(gameboard, x, y, ship=null) {
    if (x === null || y === null) return false;
    const size = gameboard.board.length;
    if (y < 0 || y >= size || x < 0 || x >= size || !gameboard.board[y][x].canHit) return false;
    for (let i = Math.max(0, y-1); i < Math.min(size, y+2); i++) {
      for (let j = Math.max(0, x-1); j < Math.min(size, x+2); j++) {
        if (i===0 && j===0) continue;
        let cell = gameboard.board[i][j];
        if (!cell.canHit && cell.ship !== ship && cell.ship !== null) return false;
      }
    }
    return true;
  }

  function randomRobotXY(opponent) {
    const gameboard = opponent.gameboard;
    const size = gameboard.board.length;
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (!checkCanHit(gameboard, x, y));
    return { x, y };
  }

  function getRobotXY(opponent) {
    const gameboard = opponent.gameboard;
    let ship = null;
    if (lastAttack === null || !gameboard.board[lastAttack[1]][lastAttack[0]].ship) {
      if (hits.length === 0) return randomRobotXY(opponent);
      queuedAttacks.shift();
    } else {
      const x = lastAttack[0];
      const y = lastAttack[1];
      const ship = gameboard.board[y][x].ship;
      if (ship.isSunk()) {
        queuedAttacks.length = 0;
        hits.length = 0;
        return randomRobotXY(opponent);
      }
      
      hits.push(lastAttack);
      
      if (hits.length === 1) {
        [-1, 1].forEach(i => { if (checkCanHit(gameboard, x, y + i, ship)) queuedAttacks.push([x, y + i]); });
        [-1, 1].forEach(i => { if (checkCanHit(gameboard, x + i, y, ship)) queuedAttacks.push([x + i, y]); });
      } else {
        const front = queuedAttacks[0];
        const diffx = front[0] - hits[0][0];
        const diffy = front[1] - hits[0][1];
        console.log(`x: ${diffx}, y: ${diffy}`);
        if (hits.length === 2 && diffy !== 0) {
          while (queuedAttacks.length > 0 && queuedAttacks[queuedAttacks.length - 1][0] !== front[0]) queuedAttacks.pop();
        }

        if (diffx !== 0) diffx > 0 ? front[0]++ : front[0]--;
        if (diffy !== 0) diffy > 0 ? front[1]++ : front[1]--;
        queuedAttacks[0] = front;
        console.log(`x: ${diffx}, y: ${diffy}, lastAttack: ${lastAttack}, front: ${front}`);
      }
    }

    let [x, y] = queuedAttacks[0];
    if (ship === null) ship = gameboard.board[hits[0][1]][hits[0][0]].ship;
    if (!checkCanHit(gameboard, x, y, ship)) {
      queuedAttacks.shift();
      [x, y] = queuedAttacks[0];
    }
    return { x, y };
  }
   
  function attack(opponent, x=null, y=null) {
    if (x === null || y === null) {
      if (!isComputer) return { valid: false, hit: false };
      const coords = getRobotXY(opponent);
      x = coords.x;
      y = coords.y;
      lastAttack = [x, y];
    }

    return opponent.gameboard.receiveAttack(x, y);
  }

  return {
    isComputer,
    gameboard,
    attack
  };
}