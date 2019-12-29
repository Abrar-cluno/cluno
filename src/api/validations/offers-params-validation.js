/**
 * module for list-offerrs controller query pararmeters
 * @module
 */
const { check } = require('express-validator');

/**
 * validation rules for offer-list controller
 * @returns [function():void]
 */
const listOffersValidationsRules = () => {
  return [
    check('limit', 'limit must be a number')
      .isNumeric()
      .optional(),
    check('portfolio', 'portfolio must be alph-numeric value')
      .isAlphanumeric()
      .optional(),
    check('price')
      .optional()
      .custom(value => {
        if (!value.hasOwnProperty('gte') || !value.hasOwnProperty('lte')) {
          throw Error(`please provide 'gte' and lte values of price filter`);
        }

        if (
          (value.gte.length === 0 && typeof value.gte !== 'number') ||
          (value.lte.length === 0 && typeof value.lte !== 'number')
        ) {
          throw Error(`minimum and max price must be a number`);
        }

        if (value.gte > value.lte) {
          throw Error(`'price[lte]' parameter must be higher value than 'price[gte]'`);
        }

        return true;
      }),
    check('make', 'make must be a alph-numeric')
      .isAlphanumeric()
      .optional()
  ];
};

module.exports = {
  listOffersValidationsRules
};
