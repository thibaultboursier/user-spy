'use strict';

exports.register = function (server, options, next) {
    server.expose('entitiesLoader', require('./entitiesLoader'));
    next();
};

exports.register.attributes = {
    name: 'utils',
    version: '1.0.0'
};