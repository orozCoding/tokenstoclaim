import { checkCoins, checkUser, updateTotal, checkVersion } from './functions.js';

window.addEventListener('load', () => {
  checkVersion();
  checkCoins();
  checkUser();
  updateTotal();
})

