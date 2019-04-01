const { app } = require('electron');
const debug = require('debug')('login');
const buildApp = require('../buildApp');
const fetcher = require('../service-calls/fetcher');
const getAuthCode = require('./getAuthCode');
const oAuthWindow = require('../windows/OAuth/OAuthWindow');
const showNotification = require('../notifications/showSuccessNotification');
const showErrorNotification = require('../notifications/showErrorNotification');

const continueLogin = async (store, tray) => {
  debug('Continuing login');

  try {
    const tokenResponse = await fetcher(store).auth.accessToken();
    store.set('accessToken', tokenResponse.access_token);
    store.set('refreshToken', tokenResponse.refresh_token);

    const accountId = await fetcher(store).account.get();

    store.set(
      'firstName',
      accountId.accounts[0].owners[0].preferred_first_name
    );
    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);

    const notificationOptions = {
      name: store.get('firstName')
    };

    showNotification({ type: 'login', notificationOptions });
    buildApp(store, tray);
  } catch (err) {
    showErrorNotification(err);
    debug('Error: ', err);
  }
};

module.exports = (store, tray) => {
  debug('Logging in');

  try {
    if (store.has('clientId') && store.has('clientSecret')) {
      store.set(
        'redirectUri',
        'https://bankbar-auth-proxy.netlify.com/.netlify/functions/bankbar-proxy/'
      );
      getAuthCode(store);

      app.on('open-url', (event, url) => {
        event.preventDefault();
        const authorizationCode = url.split('bankbar://')[1];

        store.set('authorizationCode', authorizationCode);
        continueLogin(store, tray);
      });
    } else {
      oAuthWindow(store);
    }
  } catch (err) {
    showErrorNotification(err);
    debug('Error: ', err);
  }
};
