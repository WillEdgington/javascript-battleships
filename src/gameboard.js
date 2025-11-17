import Ship from "./ship.js";

export default function Gameboard(size = 10) {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ ship: null, canHit: true }))
  );
  const ships = [];
  const missedAttacks = [];
  
  function reset() {
    const board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ ship: null, canHit: true }))
    );
    const ships = [];
    const missedAttacks = [];
  }
  
  function isValidPlacement(x, y, length, horizontal=true) {
    if (horizontal) {
      if (x + length > size) return false; 
      for (let j = Math.max(0, x-1); j < Math.min(x+length+1, size); j++) {
        for (let i = Math.max(0, y-1); i < Math.min(y+2, size); i++) {
          if (board[i][j].ship !== null) return false;
        }
      }
    } else {
      if (y + length > size) return false; 
      for (let j = Math.max(0, x-1); j < Math.min(x+2, size); j++) {
        for (let i = Math.max(0, y-1); i < Math.min(y+length+1, size); i++) {
          if (board[i][j].ship !== null) return false;
        }
      }
    }
    return true;
  }

  function placeShip(x, y, length, horizontal=true) {
    if (!isValidPlacement(x, y, length, horizontal)) return false;
    
    const ship = Ship(length);
    ships.push(ship);

    for (let i = 0; i < length; i++) {
        if (horizontal) board[y][x + i].ship = ship;
        else board[y + i][x].ship = ship;
    }
    return true;
  }

  function receiveAttack(x, y) {
    const cell = board[y][x];
    if (!cell.canHit) return false;
    board[y][x].canHit = false;

    if (cell.ship) cell.ship.hit();
    else missedAttacks.push([x, y]);
    return true;
  }
  
  function allShipsSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    reset,
    placeShip,
    receiveAttack,
    allShipsSunk,
    get misses() { return missedAttacks; },
    get board() { return board; },
  };
}