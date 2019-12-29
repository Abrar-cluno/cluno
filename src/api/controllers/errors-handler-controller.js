const httpStatus = require('http-status');

/**
 * error handler controller
 * @param {object} err - error
 * @param {object} req - request
 * @param {object} res - response
 * @note we need to specify 4 parameter to let expressjs know that its error handler controller
 */
const errorHandlerController = (err, req, res, next) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: err.code || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message
  });
};

module.exports = errorHandlerController;
