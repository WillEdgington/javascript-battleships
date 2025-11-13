import Gameboard from "../src/gameboard.js";

describe("Gameboard", () => {
  test("place ship", () => {
    const board = Gameboard();
    expect(board.placeShip(0, 0, 3, false)).toBe(true);
  });

  test("hit a ship", () => {
    const board = Gameboard();
    board.placeShip(0, 0, 3, false);
    expect(board.receiveAttack(0, 1)).toBe(true);
  });

  test("records missed shots", () => {
    const board = Gameboard();
    board.placeShip(1, 2, 2, true);
    board.receiveAttack(4, 5);
    expect(board.misses).toContainEqual([4, 5]);
  });

  test("reports when all ships are sunk", () => {
    const board = Gameboard();
    board.placeShip(3, 3, 2, false);
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    expect(board.allShipsSunk()).toBe(true);
  });
});