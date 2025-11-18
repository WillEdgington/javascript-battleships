export default function Ship(length, x, y, horizontal) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("Ship length must be a positive number");
  }
  let hits = 0;

  const hit = () => { if (hits < length) hits++; };
  const isSunk = () => hits >= length;

  return {
    get length() { return length; },
    get hits() { return hits; },
    x,
    y,
    horizontal,
    hit,
    isSunk,
  };
}