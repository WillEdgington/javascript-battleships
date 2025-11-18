const PlacementController = (() => {
  const fleet = [
    { length: 4, count: 1 },
    { length: 3, count: 2 },
    { length: 2, count: 3 },
    { length: 1, count: 4 },
  ];

  function randomise(gameboard) {
    gameboard.reset();

    for (const stype of fleet) {
        for (let i = 0; i < stype.count; i++) {
            placeShipRandomly(gameboard, stype.length);
        }
    }
  }

  function placeShipRandomly(gameboard, length) {
    const size = gameboard.board.length;
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      const horizontal = Math.random() < 0.5;

      placed = gameboard.placeShip(x, y, length, horizontal);
    }
  }

  function tryMoveShip(gameboard, ship, newX, newY, newHorizontal) {
    let length = ship.length;
    let x = ship.x;
    let y = ship.y;
    let horizontal = ship.horizontal;
    
    gameboard.removeShip(ship);
    if (gameboard.placeShip(newX, newY, length, newHorizontal)) return true;
    else gameboard.placeShip(x, y, length, horizontal);
    return false;
  }

  return {
    randomise,
    tryMoveShip
  };
})();

export default PlacementController;