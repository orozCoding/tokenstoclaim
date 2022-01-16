export const welcome = document.createElement('div');
welcome.id = 'welcome-msg';
welcome.className = 'd-flex';
welcome.innerHTML = `<div id="welcome-title" class="bold">Welcome to your portfolio of unclaimed tokens.</div>
<div id="welcome-msg" class="d-flex">
  <p>On this site you will be able to keep track of the amount 
    of unclaimed tokens you have blocked in the games 
    and their value in USD.
  </p>
  <p>Please go ahead and start selecting the tokens 
    you own and you'll be able to see the current price 
    and the input box so you can manualy enter 
    the ammount of tokens you're holding.
  </p>
</div>`

export const balanceButtons = document.createElement('section');
balanceButtons.id = 'balance-buttons'
balanceButtons.innerHTML = `<div id="suma-container">
<div id="suma-title">Total Balance</div>
<div id="suma-balance">$0</div>
</div>
<div id="buttons">
<button id="btn-reset" type="button">reset</button>
<button id="btn-refresh" type="button">refresh</button>
</div>`;