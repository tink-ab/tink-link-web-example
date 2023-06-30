import { calculateAmount } from './amount.js';

function getTemplate() {
  const tpl = document.getElementById('tpl-transaction');
  return tpl.content.cloneNode(true);
}

function render(transactions, locale) {
  const list = document.createElement('ul');
  list.classList.add('ui-list');

  const results = document.querySelector('.results').classList.remove('hidden');

  transactions.forEach((trx) => {
    const tpl = getTemplate();

    const amount = calculateAmount(trx.amount.value.scale, trx.amount.value.unscaledValue);
    const currencyAmount = new Intl.NumberFormat(locale, { style: 'currency', currency: trx.amount.currencyCode }).format(
      amount
    );

    const bookedDate = new Date(trx.dates.booked)
    const formattedDate = new Intl.DateTimeFormat(locale).format(bookedDate);
    tpl.querySelector('.transaction__description').innerText = trx.descriptions.display;
    tpl.querySelector('.transaction__amount').innerText = currencyAmount;
    tpl.querySelector('.transaction__date').innerText = formattedDate;
    tpl.querySelector('.transaction__category').innerText = trx.types.type;
    tpl.querySelector('.transaction__json').innerText = JSON.stringify(trx, null, 2);
    list.append(tpl)
  });

  document.getElementById('transactions').appendChild(list);
}

export const transactions = {
  init: async (accessToken, locale) => {
    const res = await fetch('/api-proxy/data/v2/transactions', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.ok) {
      const { transactions } = await res.json();

      render(transactions, locale);
    }
  }
};

