jest.mock('electron-store');
jest.mock('node-fetch');

const fetch = require('node-fetch');
const fetcher = require('./fetcher');
const Store = require('electron-store');

Store.mockImplementation(() => {
  return {
    get: () => 'theStore'
  };
});
const store = new Store();

const responseJson = {
  the: 'json'
};

describe('fetcher: accounts', () => {
  test('should return a list of accounts owned by the user', async () => {
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).account.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).account.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('fetcher: auth', () => {
  test('should return an access token for a specific user & client', async () => {
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).auth.accessToken();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).auth.accessToken();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  test('should return a refresh token for a specific user & client', async () => {
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).auth.refreshToken();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).auth.refreshToken();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('fetcher: balance', () => {
  test('should return balance information for a specific account', async () => {
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).balance.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).account.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('fetcher: pots', () => {
  test('should return a list of pots owned by the user', async () => {
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).pots.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).transfer.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('fetcher: transactions', () => {
  test('should return a list of accounts owned by the user', async () => {
    const responseJson = {
      the: 'json'
    };
    const response = {
      status: 200,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).transactions.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test('should throw if the response code is > 400 ', async () => {
    const responseJson = {
      the: 'json'
    };
    const response = {
      status: 400,
      json: () => responseJson
    };
    fetch.mockImplementation(() => response);
    try {
      const response = await fetcher(store).transactions.get();
      expect(response).toBe(responseJson);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
