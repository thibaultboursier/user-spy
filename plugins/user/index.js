'use strict';

const routes = require('./routes');
const clientEntity = require('./entities/Client');

exports.register = function (server, options, next) {
    const { entitiesLoader } = server.plugins.utils;

    entitiesLoader({
        path: __dirname
    });

    routes.apply(null, arguments);
    next();
}

exports.register.attributes = {
    name: 'user',
    version: '1.0.0'
}