'use strict';

const angular = require('angular');
const angularSanitize = require('angular-sanitize');
const uiRouter = require('@uirouter/angularjs').default;
const config = require('./app.config.js');
const home = require('./home');
const admin = require('./admin');
const user = require('./user');
const shared = require('./shared');

angular
    .module('spy', [
        angularSanitize,
        uiRouter,
        'home',
        'user',
        'admin',
        'shared'
    ])
    .config(config);