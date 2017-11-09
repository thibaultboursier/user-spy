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
    save(socketId) {
        const client = {
            online: true,
            positions: []
        };

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
     */
    getOnlineClients() {
        return r.db(this.opts.db)
            .table(this.table)
            .filter({ online: true })
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }

    /**
     * Updqte client position.
     * @param {string} socketId 
     * @param {Object} position 
     */
    updatePosition(socketId, position) {
        return r.db(this.opts.db)
            .table(this.table)
            .filter({ socket_id: socketId })
            .update(function (client) {
                return {
                    positions: client('positions').append(position)
                }
            })
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }

    setOffline() {
        return r.db(this.opts.db)
            .table(this.table)
            .filter({ socket_id: socketId })
            .update({ online: false })
            .run(this.opts.conn)
            .then(cursor => cursor.toArray());
    }
}

module.exports = Client;