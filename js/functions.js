import { tokens, changeCoins } from './coins.js';
import { checkerBoxes } from './containers.js';

let coins = [];

function getCoins() {
  return JSON.parse(localStorage.getItem('coins'));
}

function pushCoins(tokens) {
  localStorage.setItem('coins', JSON.stringify(tokens));
}

function checkCoins() {
  if (getCoins()) {
    coins = getCoins();
  }
  else {
    pushCoins(tokens);
  }
}

export { checkCoins, coins, getCoins, pushCoins };