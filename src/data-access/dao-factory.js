const FileBasedOffersDAO = require('./fs-offers-dao');
const config = require('../config/environment-configs');

/**
 * supported types of DAOs
 * currently, we have only file based DAO but in future we can add DynamoDB */
const supportedDAOs = {
  fs: FileBasedOffersDAO
};
/**
 * offers DAO factory
 * @class
 * @classdesc factory to create offer data-access-object
 */
class DAOFactory {
  static async createOffersDAO(type = 'fs') {
    if (!Object.keys(supportedDAOs).includes(type)) {
      throw new Error(`unknown DAO type provided`);
    }

    return supportedDAOs[type].build(config);
  }
}

module.exports = DAOFactory;
