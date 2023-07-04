import { transactions } from './transactions.js';
import { accounts } from './accounts.js';

function hideIntro() {
  document.querySelector('.intro').classList.add('hidden');
}

function showIntro() {
  document.querySelector('.intro').classList.remove('hidden');
}

/**
 * Exchange code for an accessToken that can be used to
 * get the aggregated bank data.
 * @param {string} code
 * @returns {Promise<{ token_type: string, expires_in: number, access_token: string }>}
 */
function fetchAccessToken(code) {
  return fetch(`/api-proxy/api/v1/oauth/token?code=${code}`, {
    method: 'POST',
  }).then(res => res.json());
}

function storeAccessToken(res) {
  window.sessionStorage.setItem('accessToken', JSON.stringify(res));
  return res;
}

function storeLocale(locale) {
  // Convert the locale to a format the can be used with Intl
  window.sessionStorage.setItem('locale', locale.replace('_', '-'));
}

function getLocale() {
  return window.sessionStorage.getItem('locale');
}

function clearStorage() {
  window.sessionStorage.removeItem('accessToken');
  window.sessionStorage.removeItem('locale');
}

function restart() {
  window.location.pathname = '/';
}

/**
 * Check for existing accessToken in sessionStorage
 * otherwise fetch a new accessToken using a code.
 * @param {string} code
 * @returns {Promise<{ token_type: string, expires_in: number, access_token: string }>}
 */
async function getAccessToken(code) {
  const storedAccessToken = window.sessionStorage.getItem('accessToken');
  if (storedAccessToken) {
    return JSON.parse(storedAccessToken);
  }

  return fetchAccessToken(code).then(storeAccessToken);
}

/**
 * Render fetched accounts and transactions
 * @param {string} code
 */
async function showData(code) {
  const { access_token } = await getAccessToken(code);

  if (!access_token) {
    return restart();
  }

  const locale = getLocale();
  transactions.init(access_token, locale);
  accounts.init(access_token, locale);
}

/**
 * Intercept form submission to save the value of locale
 * so it can be used when rendering the data.
 */
function setupForm() {
  const formEl = document.querySelector('.form');
  formEl.addEventListener('submit', (event) => {
    const fd = new FormData(formEl);

    storeLocale(fd.get('locale'));

    return true;
  });
}

async function start() {
  const { location, history } = window;
  const params = new URLSearchParams(location.search);

  if (params.get('code')) {
    history.replaceState({ code: params.get('code')}, '', '/data');
  }

  switch (location.pathname) {
    case '/data': {
      if (history.state?.code) {
        hideIntro();
        return showData(history.state.code);
      } else {
        return restart();
      }
    }
    case '/': {
      clearStorage();
      return;
    }
    default: {
      return restart();
    }
  }
}

function validateSetup() {
  const defaultAndInvalidClientIdValue = '<TINK_CLIENT_ID>';
  if (document.querySelector('[name=client_id]').value === defaultAndInvalidClientIdValue) {
    document.body.classList.add('error');
    alert('The input for "client_id" needs to be set in "index.html"');
  }
}

validateSetup();
setupForm();
start();
