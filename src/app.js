/**
 * @module
 * modules to initialie express app
 */

const express = require('express');

const offerRoute = require('./api/routes/v1');
const errorHandler = require('./api/controllers/errors-handler-controller');
const resourceNotFoundController = require('./api/controllers/404-controller');

const app = express();

app.use('/api/v1', offerRoute);

app.use('*', resourceNotFoundController);

app.use(errorHandler);

module.exports = app;
