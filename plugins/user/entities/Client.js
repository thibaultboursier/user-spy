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

    /**
     * Get client by socket id.
     * @param {string} socketId 
     */
    getBySocketId(socketId) {
        return r.db(this.opts.db)
            .table(this.table)
            .filter({ socket_id: socketId })
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }

    /**
     * Updqte client position.
     * @param {string} socketId 
     * @param {Object} position 
     */
    updatePosition(socketId, position) {
        return this.getBySocketId(socketId)
            .then(entry => {
                entry.positions.push(position);

                return r.db(this.opts.db)
                    .table(this.table)
                    .get(entry.id)
                    .update(entry)
                    .run(this.opts.conn)
                    .then(cursor => cursor.toArray());
            });
    }
}

module.exports = Client;