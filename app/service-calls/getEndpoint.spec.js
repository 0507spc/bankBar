const getEndpoint = require('./getEndpoint');

describe('getUrl', () => {
  test('should return the correct url', () => {
    const accountId = 'abc123';
    const account = 'account';
    const balance = 'balance';
    const transactions = 'transactions';
    const pots = 'pots';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString();

    expect(getEndpoint(account, accountId)).toBe(
      '/accounts?account_type=uk_retail'
    );
    expect(getEndpoint(balance, accountId)).toBe('/balance?account_id=abc123');
    expect(getEndpoint(transactions, accountId)).toBe(
      `/transactions?account_id=abc123&since=${todayString}&expand[]=merchant`
    );
    expect(getEndpoint(pots, accountId)).toBe('/pots');
  });

  test('should throw if something incorrect is passed in', () => {
    const accountId = 'abc123';
    const incorrectValue = 'incorrectValue';
    const undefinedValue = undefined;

    expect(() => getEndpoint(incorrectValue, accountId)).toThrow();
    expect(() => getEndpoint(undefinedValue, accountId)).toThrow();
  });
});
