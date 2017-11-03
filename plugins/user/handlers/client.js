'use strict';

const clientEntity = require('../entities/Client');

module.exports = {
    add: function ({ payload, server }, reply) {
        server.methods.db.saveEntry(payload, (err, result) => {
            const id = result.generated_keys[0];

            if (err) {
                return reply().code(500);
            }

            return reply({ id }).code(200);
        });
    },
    getAll: function ({ server }, reply) {
        server.methods.db.loadEntries((err, cursor) => {
            if (err) {
                return reply().code(500);
            }

            cursor.toArray((err, results) => {
                reply(results).code(200);
            });
        });
    },
    updatePosition: function ({ payload, server }, reply) {
        const { id, position } = payload;

        clientEntity
            .updatePosition(id, position)
            .then(results => reply(results).code(200))
            .catch(e => reply().code(500));
    }
}