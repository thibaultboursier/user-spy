'use strict';

const routes = require('./routes');
const events = require('./events');

exports.register = function (server, options, next) {
    const { entitiesLoader } = server.plugins.utils; 

    entitiesLoader({
        path: __dirname
    });

    routes(server);
    events(server);
    
    next();
}

exports.register.attributes = {
    name: 'user',
    version: '1.0.0'
}