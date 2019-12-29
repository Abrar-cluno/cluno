const httpStatus = require('http-status');

/**
 * controller for all undefined routes
 * @param {object} req - request object
 * @param {object} res -  response object
 * @param {func} next - next middleware
 */
const resourceNotFoundController = (req, res, next) => {
  const err = new Error('Resource not found');
  err.code = httpStatus.NOT_FOUND;
  next(err, req, res, next);
};

module.exports = resourceNotFoundController;
