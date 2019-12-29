/* eslint-disable consistent-return */
const httpStatus = require('http-status');

/**
 * supported filtters for offers
 */
const supportedQryParams = {
  portfolio: 'portfolio',
  price: 'price',
  make: 'make',
  limit: 'limit'
};

/**
 * builds offers list controller
 * @param {object} id - offers service
 * @returns {function({req, res, next}): void}
 */
const buildOfferslistController = ({ offerService }) => {
  /**
   * controller to handle offers list request
   * @param {object} req - request
   * @param {object} res - response
   * @param {func} next - next middle to forward request
   */
  return async (req, res, next) => {
    try {
      const filters = Object.keys(supportedQryParams).reduce((allParams, currentParam) => {
        if (!req.query[currentParam]) {
          return allParams;
        }

        return { ...allParams, ...{ [currentParam]: req.query[currentParam] } };
      }, {});

      const retrievedOffers = await offerService.getOffersList({ filters });

      return res.status(httpStatus.OK).json(retrievedOffers);
    } catch (error) {
      next(error);
    }
  };
};

/**
 * builds offer detail controller
 * @param {object} id - offers repository
 * @returns {function({req, res, next}): void}
 */
const buildOfferDetailController = ({ offerService }) => {
  /**
   * controller to handle offer detail request
   * @param {object} req - request
   * @param {object} res - response
   * @param {func} next - next middle to forward request
   */
  return async (req, res, next) => {
    try {
      const retrievedOffer = await offerService.getOfferDetails({ id: req.params.id });

      res.status(httpStatus.OK).json(retrievedOffer);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  buildOffersController: buildOfferslistController,
  buildOfferDetailController
};
