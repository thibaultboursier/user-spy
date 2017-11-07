'use strict';

const angular = require('angular');
const angularMaterial = require('angular-material');
const websockets = require('./services/websockets.service');
const trustAsHtml = require('./filters/trust-as-html.filter');

module.exports = angular
    .module('shared', [
        angularMaterial
    ])
    .service('websockets', websockets)
    .filter('trustAsHtml', trustAsHtml);    