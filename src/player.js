import Gameboard from "./gameboard.js";

export default function Player(isComputer=false) {
  const gameboard = Gameboard();
   
  function attack(opponent, x, y) {
    return opponent.gameboard.receiveAttack(x, y)
  }

  return {
    isComputer,
    gameboard,
    attack
  }
}