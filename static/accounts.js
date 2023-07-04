import { calculateAmount } from './amount.js';

function getTemplate() {
  const tpl = document.getElementById('tpl-account');
  return tpl.content.cloneNode(true);
}

function render(accounts, locale) {
  const list = document.createElement('ul');
  list.classList.add('ui-list');
  list.classList.add('accounts-list');

  accounts.forEach((account) => {
    const tpl = getTemplate();

    const { balances } = account;
    const balanceAmount = balances.booked || balances.available;

    const amount = calculateAmount(balanceAmount.amount.value.scale, balanceAmount.amount.value.unscaledValue);
    const currencyAmount = new Intl.NumberFormat(locale, { style: 'currency', currency: balanceAmount.amount.currencyCode }).format(
      amount
    );

    tpl.querySelector('.account__balance').innerText = currencyAmount;
    tpl.querySelector('.account__name').innerText = account.name;
    tpl.querySelector('.account__name').title = account.name;
    tpl.querySelector('.account__type').innerText = account.type;
    tpl.querySelector('.account__number').innerText = account?.identifiers?.financialInstitution?.accountNumber;
    list.append(tpl)
  });

  document.getElementById('accounts').appendChild(list);
}

export const accounts = {
  init: async (accessToken, locale) => {
    const res = await fetch('/api-proxy/data/v2/accounts', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.ok) {
      const { accounts } = await res.json();
      render(accounts, locale);
    }
  }
}
