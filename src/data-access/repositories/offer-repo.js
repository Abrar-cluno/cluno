/**
 * module for offerr repository
 * provides more clean API to retrieve domain entity e.g. offer
 * @module
 */

/**
 * builds offer repository
 * @param {Object} - offerFactory to provide offers
 * @returns {Object} - repository for offer
 */
const buildRepository = ({ offerFactory }) => {
  /**
   * get offers with filters
   * @param {Object} filters - filters to apply on offers
   * @param {string} filters.portfolio - portfolio of offer
   * @param {string} filters.make - make of offer
   * @param {Object} filters.price - price of offer
   * @param {number} filters.price.min - min price of offer
   * @param {number} filters.price.max - max price of offer
   * @returns {Object[]} list of available offers
   */
  async function getOffers({ filters, fieldsToSelect, limit } = {}) {
    const offerDAO = await offerFactory.createOffersDAO();
    const offers = offerDAO.query({
      params: filters,
      fields: fieldsToSelect,
      limit
    });
    return offers;
  }
  /**
   * get offer
   * @param {object} options
   * @param {number} options.id - offer id
   * @param {array} options.fieldsToSelect - fields to select
   * @returns {object}
   */
  async function getOffer({ id, fieldsToSelect } = {}) {
    const offerDAO = await offerFactory.createOffersDAO();
    const offers = offerDAO.query({
      params: { id },
      fields: fieldsToSelect
    });
    return offers;
  }

  return {
    getOffers,
    getOffer
  };
};

module.exports = buildRepository;
