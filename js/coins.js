export let tokens = [
  {
  index: 0,
  name: 'slp',
  api: 'https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd',
  path: 'smooth-love-potion',
  act: false,
  price: 0,
  balance: 0,
  subTotal: 0,
},
  {
  index: 1,
  name: 'bcoin',
  api: 'https://api.coingecko.com/api/v3/simple/price?ids=bomber-coin&vs_currencies=usd',
  path: 'bomber-coin',
  act: false,
  price: 0,
  balance: 0,
  subTotal: 0,
},
  {
  index: 2,
  name: 'atlas',
  api: 'https://api.coingecko.com/api/v3/simple/price?ids=star-atlas&vs_currencies=usd',
  path: 'star-atlas',
  act: false,
  price: 0,
  balance: 0,
  subTotal: 0,
}
];

export function changeCoins(val) {
  coins = val;
}