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
     * Save new client.
     * @param {Object} client 
     */
    save(client) {
        return r.db(this.opts.db)
            .table(this.table)
            .insert(client)
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }

    /**
     * Get all clients.
     */
    getAll() {
        return r.db(this.opts.db)
            .table(this.table)
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
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

    /**
     * Get only online clients.
     * @returns {undefined}
     */
    getOnlineClients() {
        return r.db(this.opts.db)
            .table(this.table)
            .filter({ online: true })
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }

    updatePosition(id, position) {
        return this.server.methods.db.updateEntry(id, position)
            .then(cursor => cursor.toArray());
    }
}

module.exports = Client;