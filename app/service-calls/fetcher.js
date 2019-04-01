const fetch = require('node-fetch');
const errorResponse = require('../utils/errorResponse/errorResponse');
const getEndpoint = require('./getEndpoint');
const debug = require('debug')('fetcher');
const dedupe = require('randomstring');
const { dialog } = require('electron');

const bankBarFetcher = async (fetcherOptions) => {
  const { endpoint, method = 'GET', body, headers } = fetcherOptions;
  try {
    const options = {
      headers,
      method,
      body
    };
    const fullUrl = `https://api.monzo.com${endpoint}`;
    const response = await fetch(fullUrl, options);
    if (errorResponse(response)) {
      throw response;
    }
    debug(`Success fetching ${endpoint}`);
    return await response.json();
  } catch (err) {
    debug('Error: ', err);
    throw err;
  }
};

const fetcher = (store) => {
  const accountId = store.get('accountId');
  const accessToken = store.get('accessToken');

  const account = {
    get: () => {
      const endpoint = getEndpoint('account');
      const fetcherOptions = {
        endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      return bankBarFetcher(fetcherOptions);
    }
  };

  const balance = {
    get: () => {
      const endpoint = getEndpoint('balance', accountId);
      const fetcherOptions = {
        endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      return bankBarFetcher(fetcherOptions);
    }
  };

  const transactions = {
    get: () => {
      const endpoint = getEndpoint('transactions', accountId);
      const fetcherOptions = {
        endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      return bankBarFetcher(fetcherOptions);
    }
  };

  const pots = {
    get: () => {
      const endpoint = getEndpoint('pots');
      const fetcherOptions = {
        endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      return bankBarFetcher(fetcherOptions);
    },
    transfer: (pot, valueId, balance) => {
      const transferValues = {
        1: 5000,
        2: 2500,
        3: 1000,
        4: 500
      };

      if (balance < transferValues[valueId]) {
        dialog.showErrorBox(
          'Cannot transfer into Pot.',
          'Your balance is too low, please try again.'
        );
        return;
      }
      const dedupeId = dedupe.generate(10);
      const form = new URLSearchParams();
      form.append('source_account_id', accountId);
      form.append('amount', transferValues[valueId].toString());
      form.append('dedupe_id', dedupeId);

      const fetcherOptions = {
        endpoint: `${getEndpoint('pots')}/${pot.id}/deposit`,
        method: 'PUT',
        body: form,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      return bankBarFetcher(fetcherOptions);
    }
  };

  const auth = {
    accessToken: () => {
      const endpoint = getEndpoint('auth');

      const authorizationCode = store.get('authorizationCode');
      const clientId = store.get('clientId');
      const clientSecret = store.get('clientSecret');
      const redirectUri = store.get('redirectUri');

      const form = new URLSearchParams();

      form.append('grant_type', 'authorization_code');
      form.append('client_id', clientId);
      form.append('client_secret', clientSecret);
      form.append('redirect_uri', redirectUri);
      form.append('code', authorizationCode);

      const fetcherOptions = { endpoint, method: 'POST', body: form };
      return bankBarFetcher(fetcherOptions);
    },
    refreshToken: () => {
      const endpoint = getEndpoint('auth');

      const clientId = store.get('clientId');
      const clientSecret = store.get('clientSecret');
      const refreshToken = store.get('refreshToken');

      const form = new URLSearchParams();

      form.append('client_id', clientId);
      form.append('client_secret', clientSecret);
      form.append('refresh_token', refreshToken);
      form.append('grant_type', 'refresh_token');

      const fetcherOptions = { endpoint, method: 'POST', body: form };
      return bankBarFetcher(fetcherOptions);
    }
  };
  return { account, balance, transactions, pots, auth };
};

module.exports = fetcher;
