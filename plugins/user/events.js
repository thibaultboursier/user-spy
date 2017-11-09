'use strict';

const clientHandler = require('./handlers/client');

module.exports = function (server) {
    return;
    const { client } = server.app.entities;
    const eventEmitter = server.plugins.websockets.eventEmitter;

    eventEmitter
        .on('client-connect', socket => {
            console.log(`connection from ${socket.id}`);
        })
        .on('client-disconnect', socket => {
            console.log(`disconnection from ${socket.id}`);
        });
}