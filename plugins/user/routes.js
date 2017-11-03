'use strict';

const Joi = require('joi');
const client = require('./handlers/client');

module.exports = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            handler: {
                directory: {
                    path: 'public'
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/clients',
        config: {
            id: 'get-all-clients',
            handler: client.getAll
        }
    });

    server.route({
        method: 'PUT',
        path: '/clients',
        config: {
            id: 'update-client-position',
            handler: client.updatePosition,
            validate: {
                payload: {
                    id: Joi.string(),
                    position: Joi.object().keys({
                        x: Joi.number(),
                        y: Joi.number(),
                        time: Joi.number()
                    })
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/clients',
        config: {
            id: 'add-client',
            handler: client.add
        }
    });

    next();
}