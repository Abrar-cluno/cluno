/**
 * mounts controller to the endpoints
 * @module
 */

const express = require('express');

const offerRoute = require('./offer-route');

const router = express.Router();

router.use('/offer', offerRoute);

module.exports = router;
