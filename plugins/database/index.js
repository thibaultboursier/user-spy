'use strict';

const config = require('../../config/config');
const r = require('rethinkdb');

exports.register = function (server, options, next) {
    const { db } = config.rethinkdb;
    let conn;

    r.connect((err, connection) => {
        if (err) return next(err);

        conn = connection;

        r.dbCreate(db).run(connection, (err, result) => {
            r.db(db).tableCreate('entries').run(connection, (err, result) => {

                server.method('db.get', () => ({ db, conn }));

                return next();
            });
        });
    });




    return;


    server.method('db.saveEntry', (entry, callback) => {
        entry.online = true;
        entry.position = [];
        r.db(db).table(entriesTable).insert(entry).run(conn, callback);
    });

    server.method('db.updateEntry', (id, position, callback) => {
        r.db(db).table(entriesTable).get(id).run(conn, function (err, entry) {
            console.log(entry);
            console.log(position)
            entry.position.push(position);
            r.db(db).table(entriesTable).get(id).update(entry).run(conn, callback);
        });
    });

    server.method('db.loadEntries', (callback) => {
        r.db(db).table(entriesTable).run(conn, callback);
    });
};

exports.register.attributes = {
    name: 'database',
    version: '1.0.0'
}