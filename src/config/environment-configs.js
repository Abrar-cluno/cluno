/**
 * module for environment specific app configurations
 * @module
 */
const configurations = {
  default: {
    base_url: (process.env.base_url || 'http://localhost').replace(/\/$/, ''),
    offerRemotePath: (
      process.env.base_url || 'https://assets.cluno.com/offer/dynamodb.export.json'
    ).replace(/\/$/, '')
  },
  development: {},
  testing: {},
  staging: {},
  production: {}
};

const envSpecificConfigs = process.env.NODE_ENV || 'development';

module.exports = {
  ...configurations.default,
  ...configurations[envSpecificConfigs]
};
