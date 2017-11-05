'use strict';

exports.register = function (server, options, next) {
    server.expose('entitiesLoader', require('./entitiesLoader').bind(null, server));
    next();
};

exports.register.attributes = {
    name: 'utils',
    version: '1.0.0'
};