import { checkCoins, coins, getCoins, pushCoins, getPrice, printPrice } from './functions.js';
import { checkerBoxes } from './containers.js';
import { tokens } from './coins.js';

window.addEventListener('load', () => {
  checkCoins();
  console.log('checked the coins');
})

checkerBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    let arr = Array.from(checkerBoxes)
    let coins = getCoins();
    let i = arr.indexOf(box);
    console.log(i);
    if(box.checked){
      console.log(`checking ${coins[i].name}`);
      coins[i].act = true;
      pushCoins(coins);
    } else {
      console.log(`unchecking ${coins[i].name}`);
      coins[i].act = false;
      pushCoins(coins);
    }
  })
})