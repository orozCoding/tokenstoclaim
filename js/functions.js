import { tokens, changeCoins } from './coins.js';
import { welcome, balanceButtons } from './sections.js';

let coinsContainer = document.getElementById('coins-container');
let coins = [];

let ver = '0.0.4';

function checkVersion() {
  if (!localStorage.getItem('version')){
    localStorage.setItem('version', ver)
  } else {
    if (localStorage.getItem('version') !== ver) {
      localStorage.clear();
      location.reload();
    }
  }
}

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
      coins[i].balance = balance;
    }
  }
  pushCoins(coins);
}

function updateTotal() {
  if (document.getElementById('suma-balance')) {
    let totalBalance = document.getElementById('suma-balance');
    let tokens = getCoins();
    let sum = 0;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.act === true && token.balance !== 'Enter your tokens') {
        sum += Number(token.balance.slice(1));
      }
    }
    if (sum === NaN) {
      totalBalance.innerHTML = `$0`;
    } else {
      totalBalance.innerHTML = `$${sum.toFixed(2)}`;
    }
  }
}

async function displayToken(coin) {
  let newToken = document.createElement('div');
  let { name, balance, input } = coin;
  newToken.id = `${coin.name}-container`;
  newToken.classList.add('coin-container', 'd-flex');

  newToken.innerHTML = `<div id="${name}-title" class="coin-title">${name.toUpperCase()}</div>
  <div id="${name}-section" class="coin-usd">Price in USD:</div>
  <div class="coin-price-container"><div id="${name}-price" class="coin-price">Loading Price...</div></div>
  <input id="${name}-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="${name}-balance" class="coin-balance">${balance}</div>`

  coinsContainer.appendChild(newToken);

  let price = await getPrice(coin);
  let priceBox = document.getElementById(`${name}-price`);
  setTimeout(() => {
    priceBox.innerHTML = '$' + price.toFixed(4);
  }, 2000)

  let inputBox = document.getElementById(`${name}-input`);
  inputBox.value = input;
  let balanceBox = document.getElementById(`${name}-balance`);

  inputBox.addEventListener('keyup', () => {
    // when type, update input in coin localStorage
    let coins = getCoins();
    for (let i = 0; i < coins.length; i++) {
      if (coins[i].name === name) {
        coins[i].input = Number(inputBox.value);
      }
    }
    pushCoins(coins);
    // now make calcs to display and also save
    let newBalance = `$${Number((inputBox.value * price).toFixed(2))}`;
    balanceBox.innerHTML = newBalance;
    updateBalance(name, newBalance);
    //update total
    updateTotal();
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

function checkBox(coin) {
  let box = document.getElementById(`cb-${coin.index}`);
  box.checked = true;
}

function renderUser() {
  let coins = getCoins();
  coins.forEach(coin => {
    if (coin.act === true) {
      displayToken(coin);
      checkBox(coin);
    }
  });
}

function appendButtons() {
  let body = document.getElementById('body');
  let checkers = document.getElementById('checkers');
  body.insertBefore(balanceButtons, checkers)
  let reset = document.getElementById('btn-reset');
  reset.addEventListener('click', () => {
    localStorage.clear()
    location.reload();
  })
  let refresh = document.getElementById('btn-refresh');
  refresh.addEventListener('click', () => {
    location.reload();
  })
}

function checkSession() {
  let coins = getCoins();
  let user;
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].act === true) {
      user = 'old';
      if (document.getElementById('welcome-msg')) {
        welcome.remove();
        appendButtons()
        break;
      }
      appendButtons()
      break;
    } else {
      user = 'new';
    }
  }
  if (user === 'new') {
    let coinsContainer = document.getElementById('coins-container');
    coinsContainer.appendChild(welcome)
    if (document.getElementById('balance-buttons')) {
      balanceButtons.remove();
    }
  }
}

function oldUser() {
  if (document.getElementById('welcome-msg')) {
    welcome.remove();
  }

  let buttons = document.getElementById('balance-buttons')

  if (buttons != true) {
    appendButtons()
  }
}



export {
  checkCoins, coins, getCoins, pushCoins, fetchPrice, getPrice,
  displayToken, removeToken, updatePrices, renderUser, checkBox, checkSession,
  oldUser, appendButtons, updateTotal, checkVersion
};