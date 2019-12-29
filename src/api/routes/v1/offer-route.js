/**
 * mounts offer controllers to the end-pounts
 * @module
 */
const express = require('express');
const requestValidator = require('../../middlewares');
const { listOffersValidationsRules } = require('../../validations/offers-params-validation');
const offerService = require('../../../services/offer');

const {
  buildOffersController,
  buildOfferDetailController
} = require('../../controllers/offerrs-controller');

const router = express.Router();
const offersController = buildOffersController({ offerService });
const offerDetailsControllerr = buildOfferDetailController({ offerService });
router.route('/').get(listOffersValidationsRules(), requestValidator, offersController);
router.route('/:id').get(offerDetailsControllerr);

module.exports = router;
