'use strict';

module.exports = {
    setupChangefeedPush: function(){
        console.log(server.entities.client)
        clientEntity.watch();
    },
    register: function ({ payload, server }, reply) {
        server.methods.db.saveEntry(payload, (err, result) => {
            const id = result.generated_keys[0];

            if (err) return reply().code(500);

            return reply({ id }).code(200);
        });
    },
    getAll: function ({ server }, reply) {
        console.log(server.methods.dbs);
        server.methods.dbs.table('clients')
            .filter({online: true})
            .get()
            .run()
return;
        server.methods.db.loadEntries((err, cursor) => {
            if (err) return reply().code(500);
            
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