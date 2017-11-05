'use strict';

module.exports = {
    /**
     * Register new client.
     */
    register: function ({ payload, server }, reply) {
        const { client } = server.app.entities;
        
        client.save(payload)
            .then(result => reply(result).code(200))
            .catch(err => reply().code(500));
    },
    /**
     * Get all clients.
     */
    getAll: function ({ server }, reply) {
        const { client } = server.app.entities;

        client.getOnlineClients()
            .then(results => reply(results).code(200))
            .catch(err => reply().code(500));
    },
    /**
     * Update client position.
     */
    updatePosition: function ({ payload, server }, reply) {
        const { id, position } = payload;

        clientEntity
            .updatePosition(id, position)
            .then(results => reply(results).code(200))
            .catch(e => reply().code(500));
    }
}