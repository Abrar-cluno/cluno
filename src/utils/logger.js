/**
 * @module
 * modules for logger
 */
const bunyan = require('bunyan');
const { resolve } = require('path');

const logsChannel = 'cluno-offers';

const logger = bunyan.createLogger({
  name: logsChannel,
  src: !!process.env.LOG_SOURCE,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      type: 'rotating-file',
      period: '7d',
      count: 3,
      level: 'info',
      path: process.env.LOG_FILENAME || resolve(`${__dirname}/../system.log`)
    }
  ]
});

module.exports = logger;
