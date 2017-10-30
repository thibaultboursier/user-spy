const angular = require('angular');
const config = require('./admin.config');
const history = require('./history/history.component');
const clients = require('./clients/clients.component');
const cursor = require('./history/cursor.directive');
const clientsService = require('./clients/clients.service');

module.exports = angular
    .module('admin', [])
    .config(config)
    .component('history', history)
    .component('clients', clients)    
    .directive('cursor', cursor)
    .factory('clientsService', clientsService);