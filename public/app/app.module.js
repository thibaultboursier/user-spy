const angular = require('angular');
const angularSanitize = require('angular-sanitize');
const uiRouter = require('@uirouter/angularjs').default;
const config = require('./app.config.js');
const home = require('./home');
const admin = require('./admin');
const user = require('./user');

angular
    .module('spy', [
        angularSanitize,
        uiRouter,
        'home',
        'user',
        'admin'
    ])
    .config(config)
    .filter('trustAsHtml', function ($sce) {
        return $sce.trustAsHtml;
    });