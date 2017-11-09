'use strict';

const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();

module.exports = function (server) {
    const nesRegistration = {
        register: require('nes'),
        options: {
            onConnection: function (socket) {
                eventEmitter.emit('client-connect', socket);
            },
            onDisconnection: function (socket) {
                eventEmitter.emit('client-disconnect', socket);
            }
        }
    };

    server.register(nesRegistration, (err) => {
        if (err) console.error('Failed to load plugin:', err);

        server.expose('eventEmitter', eventEmitter);
    });
};