/* eslint-disable class-methods-use-this */
const AWS = require('aws-sdk');
const axios = require('axios');

/**
 * DAO for offers
 * @class
 * TODO: change the name to In-memory DAO
 */
class FileBasedOffersDAO {
  /**
   * construct filebased offers DB instance
   * @param {Object[]} offers - list of avaiable offers
   * @returns {Object}
   */
  constructor({ offers }) {
    this.offers = offers;

    /**
     * available filters
     */
    this.availableFilters = {
      id: id => offer => {
        if (!id) {
          return true;
        }
        return offer.id === id;
      },
      visible: visiblity => offer => {
        if (!visiblity) {
          return true;
        }
        return offer.visible === visiblity;
      },
      price: ({ min, max }) => offer => {
        if (!min || !max) {
          return true;
        }
        return offer.pricing.price >= min && offer.pricing.price <= max;
      },
      portfolio: portfolio => offer => {
        if (!portfolio) {
          return true;
        }
        return offer.portfolio === portfolio;
      },
      make: make => offer => {
        if (!make) {
          return true;
        }
        return offer.car.make === make;
      }
    };
  }

  /**
   * creates filebase DAO
   * @param {string} offerRemotePath - remote path of offers file
   * @returns {Object}
   * TODO: add time for network request
   */
  static async build({ offerRemotePath }) {
    const availableOffers = await axios.get(offerRemotePath);
    const transformedOffers = availableOffers.data.Items.map(offer =>
      AWS.DynamoDB.Converter.unmarshall(offer)
    );
    return new FileBasedOffersDAO({ offers: transformedOffers });
  }

  /**
   * construct filter with specific params
   * @param {Object} filters
   * @returns {Array}
   */
  constructFilters({ filtersToApply, availableFilters }) {
    return Object.keys(filtersToApply).reduce((allFilters, currentFilter) => {
      if (currentFilter in availableFilters) {
        const filterParams = filtersToApply[currentFilter];
        allFilters.push(availableFilters[currentFilter](filterParams));
      }
      return allFilters;
    }, []);
  }

  /**
   * set results to be sorted by price asc or desc
   * @param {string} order - sorting order
   * @returns {Object}
   */
  sortByPrice(order = 'asc') {
    this.sortingOrder = order;
    return this;
  }

  /**
   * set maximum offers to return
   * @param {number} limit - max. offers limit
   * @returns {Object}
   */
  setLimit(limit) {
    this.limit = limit;
    return this;
  }

  /**
   * query offers
   * @param {Object} params
   * @param {string} portfolio
   */
  query({ params, fields, limit } = {}) {
    const filtersToApply = this.constructFilters({
      filtersToApply: { ...params },
      availableFilters: this.availableFilters
    });

    /** applies filter sequentially and stops as soon as any filter faills */
    const validOffers =
      filtersToApply.length > 0
        ? this.offers.filter(offer => {
            return filtersToApply.every(filter => filter(offer));
          })
        : this.offers;

    const offersWithInLimit = limit ? validOffers.slice(0, limit) : validOffers;

    const transformedOffers = fields
      ? offersWithInLimit.map(offer => {
          return fields.reduce((offerIncFields, field) => {
            if (offer[field]) {
              offerIncFields[field] = offer[field];
            }
            return offerIncFields;
          }, {});
        })
      : offersWithInLimit;

    /** sorts offers asc order by price */
    const offerAscOrderByPrice = transformedOffers.sort(
      (offer1, offer2) => offer1.pricing.price - offer2.pricing.price
    );
    return offerAscOrderByPrice;
  }
}

module.exports = FileBasedOffersDAO;
