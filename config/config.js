'use strict';

const { NODE_ENV } = process.env;
const config = `./config.${NODE_ENV || 'dev'}.json`;

module.exports = require(config);