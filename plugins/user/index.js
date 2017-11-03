'use strict';

const routes = require('./routes');

exports.register = function (server, options, next) {
    routes.apply(null, arguments);
    next();
}

exports.register.attributes = {
    name: 'user',
    version: '1.0.0'
}