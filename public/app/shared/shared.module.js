const angular = require('angular');
const websockets = require('./services/websockets.service');
const trustAsHtml = require('./filters/trust-as-html.filter');

module.exports = angular
    .module('shared', [])
    .service('websockets', websockets)
    .filter('trustAsHtml', trustAsHtml);    