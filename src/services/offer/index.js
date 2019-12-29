const offerFactory = require('../../data-access/dao-factory');
const offerRepository = require('../../data-access/repositories/offer-repo')({ offerFactory });
const offerService = require('./offer-service');

module.exports = offerService({ offerRepo: offerRepository });
