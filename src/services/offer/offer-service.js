/**
 * @module
 * module for OfferSevice
 * OfferService provides more clean API for use-cases
 * works like a facade by forwarrding calls to underlying Repositories
 */

/**
 * builds offer-service instance
 * @param {Object} - offerRepo to provide offers
 * @returns {Object} - offer service instance
 */
const buildOfferService = ({ offerRepo }) => {
  /**
   * list offers
   * @param {Object} filters - filters to apply on offers
   * @param {string} filters.portfolio - portfolio of offer
   * @param {string} filters.make - make of offer
   * @param {Object} filters.price - price of offer
   * @param {number} filters.price.min - min price of offer
   * @param {number} filters.price.max - max price of offer
   * @returns {Object[]} list of available offers
   */
  async function getOffersList({
    filters: { portfolio, make, price: { gte, lte } = {}, limit } = {},
    fieldsToSelect = ['id', 'teaser', 'detailUrl', 'labels', 'pricing']
  } = {}) {
    const offers = await offerRepo.getOffers({
      filters: { portfolio, make, price: { min: gte, max: lte }, visible: true },
      fieldsToSelect,
      limit
    });
    return {
      offers_count: offers.length,
      offers
    };
  }

  /**
   * get offer
   * @param {object} params
   * @param {number} params.id - offer id
   * @param {array} params.fieldsToSelect - fields to select
   * @returns {object}
   */
  async function getOfferDetails({
    id,
    fieldsToSelect = [
      'portfolio',
      'conditions',
      'visible',
      'car',
      'available',
      'labels',
      'segment',
      'images',
      'id',
      'pricing'
    ]
  } = {}) {
    const detailedOffer = offerRepo.getOffer({ id, fieldsToSelect });
    return detailedOffer;
  }

  return {
    getOffersList,
    getOfferDetails
  };
};

module.exports = buildOfferService;
