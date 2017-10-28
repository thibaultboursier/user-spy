const angular = require('angular');
const config = require('./admin.config');
const history = require('./history/history.component');
const clients = require('./clients/clients.component');
const cursor = require('./history/cursor.directive');

module.exports = angular
    .module('admin', [])
    .config(config)
    .component('history', history)
    .component('clients', clients)    
    .directive('cursor', cursor);