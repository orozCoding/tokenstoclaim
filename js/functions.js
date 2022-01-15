import { tokens, changeCoins } from './coins.js';
import { checkerBoxes } from './containers.js';

let coinsContainer = document.getElementById('coins-container');
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

function fetchPrice(token) {
  let price = fetch(token.api)
    .then((response) => response.json())
    .then((data) => {
      return data[token.path]['usd'];
    });
  return price;
}

async function getPrice(token) {
  let price = fetchPrice(token)
  const a = await price;
  return Number(a);
};

function updateBalance(name, balance) {
  let coins = getCoins();
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].name === name) {
      coins[i].balance = Number(balance);
    }
  }
  pushCoins(coins);
}

async function displayToken(coin) {
  let newToken = document.createElement('div');
  let { name } = coin;
  newToken.id = `${coin.name}-container`;
  newToken.classList.add('coin-container', 'd-flex');

  newToken.innerHTML = `<div id="${name}-title" class="coin-title">${name.toUpperCase()}</div>
  <div id="${name}-section" class="coin-usd">Price in USD:</div>
  <div class="coin-price-container"><div id="${name}-price" class="coin-price">Loading Price...</div></div>
  <input id="${name}-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="${name}-balance" class="coin-balance">Enter your tokens</div>`

  coinsContainer.appendChild(newToken);

  let price = await getPrice(coin);
  let priceBox = document.getElementById(`${name}-price`);
  setTimeout(() => {
    priceBox.innerHTML = '$' + price.toFixed(4);
  }, 2000)

  let balance = document.getElementById(`${name}-balance`)

  let input = document.getElementById(`${name}-input`);
  input.addEventListener('keyup', () => {
    let newBalance = Number((input.value * price).toFixed(2));
    balance.innerHTML = `$${newBalance}`;
    updateBalance(name, newBalance);
  })
}

function removeToken(coin) {
  let toRemove = document.getElementById(`${coin.name}-container`);
  toRemove.remove();
}

async function updatePrices(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].act === true) {
      let price = await getPrice(arr[i]);
      arr[i].price = price;
    }
  }
  pushCoins(arr);
}




export { checkCoins, coins, getCoins, pushCoins, fetchPrice, getPrice, displayToken, removeToken, updatePrices };