'use strict';

const nesWrapper = require('./nesWrapper');

exports.register = function (server, options, next) {
    nesWrapper(server);

    next();
};

exports.register.attributes = {
    name: 'websockets',
    version: '1.0.0'
}