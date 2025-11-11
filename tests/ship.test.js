import Ship from "../src/ship.js";

describe("Ship Object", () => {
  test("ship takes hits and sinks", () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});