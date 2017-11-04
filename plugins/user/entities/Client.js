'use strict';

const r = require('rethinkdb');

class Client {
    constructor(opts) {
        this.opts = opts;
        this.name = 'client';
        this.table = 'clients';
    }

    /**
     * Factory to construct new Client.
     * @param {Object} opts
     */
    static factory(opts) {
        return new Client(opts);
    }

    /**
     * Watch client updates.
     * @returns {undefined}
     */
    watch() {
        r.db(this.opts.db)
            .table(this.table)
            .changes()
            .run(this.opts.conn, (err, cursor) => {
                cursor.each((err, item) => {
                    this.opts.server.publish('/clients/updates', item);
                });
        });
    }

    getOnlineClients() {
        console.log(this.server.plugins.database)
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

module.exports = Client;