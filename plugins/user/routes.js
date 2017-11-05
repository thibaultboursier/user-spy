'use strict';

const Joi = require('joi');
const clientHandler = require('./handlers/client');

module.exports = function (server, options, next) {
    const { client } = server.app.entities;

    client.watch();

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
            handler: clientHandler.getAll
        }
    });

    server.route({
        method: 'PUT',
        path: '/clients',
        config: {
            id: 'update-client-position',
            handler: clientHandler.updatePosition,
            validate: {
                payload: {
                    id: Joi.string().required(),
                    position: Joi.object().required().keys({
                        x: Joi.number().required(),
                        y: Joi.number().required(),
                        time: Joi.number().required()
                    })
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/clients',
        config: {
            id: 'register-client',
            handler: clientHandler.register
        }
    });

    server.subscription('/clients/updates');

    next();
}