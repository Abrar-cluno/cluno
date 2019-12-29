/* eslint-disable global-require */

describe('test suite for DAO factory', () => {
  beforeAll(() => {
    jest.mock('axios', () => {
      const availableOffers = require('./__fixtures__/offers');
      return {
        get: () => Promise.resolve({ data: { Items: availableOffers } })
      };
    });
  });

  it('factory should create files-system based DAO', async () => {
    const DAOFactory = require('../data-access/dao-factory');
    const fsDAO = await DAOFactory.createOffersDAO('fs');
    expect(fsDAO).toBeDefined();
  });

  it('factory should not create any object given unknow type of DAO', async () => {
    const DAOFactory = require('../data-access/dao-factory');
    await expect(DAOFactory.createOffersDAO('UNKNOWN')).rejects.toThrow(
      'unknown DAO type provided'
    );
  });
});
