import Ship from "./ship.js";

export default function Gameboard(size = 10) {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ ship: null, canHit: true }))
  );
  const ships = [];
  const missedAttacks = [];
  
  function isValidPlacement(x, y, length, horizontal=true) {
    if (horizontal) {
      if (x + length > size) return false; 
      for (let i = -1; i <= length; i++) {
        if (y > 0 && x + i >= 0 && x + i !== size && board[y - 1][x + i].ship !== null) return false;
        if (y < size - 1 && x + i >= 0 && x + i !== size && board[y + 1][x + i].ship !== null) return false;
        if (i !== length && i !== -1 && board[y][x + i].ship !== null) return false;
      }
    } else {
      if (y + length > size) return false; 
      for (let i = -1; i <= length; i++) {
        if (x > 0 && y + i >= 0 && y + i !== size && board[y + i][x - 1].ship !== null) return false;
        if (x < size - 1 && y + i >= 0 && y + i !== size && board[y + i][x + 1].ship !== null) return false;
        if (i !== length && i !== -1 && board[y + i][x].ship !== null) return false;
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
    placeShip,
    receiveAttack,
    allShipsSunk,
    get misses() { return missedAttacks; },
    get board() { return board; },
  };
}