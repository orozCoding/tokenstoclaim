import { checkCoins, coins, getCoins, pushCoins, fetchPrice, getPrice, displayToken, removeToken, updatePrices } from './functions.js';
import { checkerBoxes } from './containers.js';
import { tokens } from './coins.js';

window.addEventListener('load', () => {
  checkCoins();
})

checkerBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    let arr = Array.from(checkerBoxes)
    let coins = getCoins();
    let i = arr.indexOf(box);
    let token = coins[i];
    if(box.checked){
      token.act = true;
      setTimeout(pushCoins(coins), 2000) ;
      displayToken(token);
      updatePrices(coins);
    } else {
      coins[i].act = false;
      pushCoins(coins);
      removeToken(token);
    }
  })
})

