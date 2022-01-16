import { checkCoins, coins, getCoins, pushCoins, fetchPrice, getPrice, displayToken, 
  removeToken, updatePrices, renderUser, checkBox, checkSession, appendButtons,
  oldUser } from './functions.js';
import { checkerBoxes } from './containers.js';
import { tokens } from './coins.js';

window.addEventListener('load', () => {
  if(getCoins()){
    renderUser();
  }
  checkCoins();
  checkSession();
})

checkerBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    let arr = Array.from(checkerBoxes)
    let coins = getCoins();
    let i = arr.indexOf(box);
    let token = coins[i];
    if(box.checked){
      token.act = true;
      displayToken(token);
      updatePrices(coins);
      oldUser();
    } else {
      token.act = false;
      pushCoins(coins);
      removeToken(token);
      checkSession();
    }
  })
})

