'use strict';

class Client {
    constructor(server) {
        this.server = server;
    }

    getAll() {
        console.log('ii')
        return this.server.methods.db.loadEntries()
            .then(cursor => cursor.toArray());
    }

    updatePosition(id, position) {
        return this.server.methods.db.updateEntry(id, position)
            .then(cursor => cursor.toArray());
    }
}

module.export = function (server) {
    const client = new Client(server);

    return client;
}