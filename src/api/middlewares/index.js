const httpStatus = require('http-status');
const { validationResult } = require('express-validator');

/**
 * middlewarer to validate request quey parameters
 * @param {object} req - request object
 * @param {object} res -  response object
 * @param {func} next - next middleware
 */
const requestValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors
  });
};

module.exports = requestValidator;
