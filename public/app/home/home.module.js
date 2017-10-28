const angular = require('angular');
const config = require('./home.config');

module.exports = angular
    .module('home', [])
    .config(config);