'use strict';

const angular = require('angular');
const config = require('./user.config');
const register = require('./register/register.component');

module.exports = angular
    .module('user', [])
    .config(config)
    .component('register', register);