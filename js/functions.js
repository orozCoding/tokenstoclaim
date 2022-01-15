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

function getPrice(coin) {
  fetch(coin.api)
    .then((response) => response.json())
    .then((data) => {
      return data[coin.path];
    });
}

async function printPrice(token) {
  const a = await token;
  console.log('el precio es ' + a);
};

export { checkCoins, coins, getCoins, pushCoins, getPrice, printPrice };