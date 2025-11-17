import Player from "../src/player.js";
import Gameboard from "../src/gameboard.js";

describe("Player Object", () => {
  test("player can attack another board", () => {
    const p1 = Player();
    const p2 = Player();
    p2.gameboard.placeShip(0, 0, 1);
    p1.attack(p2, 0, 0);
    expect(p2.gameboard.allShipsSunk()).toBe(true);
  });

  test("each player has its own gameboard", () => {
    const p1 = Player();
    const p2 = Player();
    expect(p1.gameboard && p2.gameboard && p1.gameboard !== p2.gamebaord).toBe(true)
  });

  test("robot can attack", () => {
    const p1 = Player(true);
    const p2 = Player();
    p2.gameboard.placeShip(0, 0, 1);
    expect(p1.attack(p2)).toBe(true);
  });
});