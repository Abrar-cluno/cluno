/* eslint-disable global-require */
const { buildOffersController } = require('../api/controllers/offerrs-controller');

describe('test suite for offer controller', () => {
  beforeAll(() => {
    jest.mock('axios', () => {
      const availableOffers = require('./__fixtures__/offers');
      return {
        get: () => Promise.resolve({ data: { Items: availableOffers } })
      };
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should get offers in the response', async () => {
    const offerService = require('../services/offer');
    const mockedRequest = {
      query: {
        portfolio: '0001'
      }
    };

    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const mockedResponse = mockResponse();
    const mockerErrorHandler = jest.fn();

    const offerControlle = buildOffersController({ offerService });

    await offerControlle(mockedRequest, mockedResponse, mockerErrorHandler);

    expect(mockedResponse.json.mock.calls[0].length).toBeGreaterThanOrEqual(1);
  });
});
