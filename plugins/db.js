'use strict';

const r = require('rethinkdb');

exports.register = function (server, options, next) {
    const db = 'user_spy';
    const entriesTable = 'clients';
    let conn;

    r.connect((err, connection) => {
        if (err) return next(err);

        conn = connection;
        console.log('connection', conn)

        r.dbCreate(db).run(connection, (err, result) => {
            r.db(db).tableCreate(entriesTable).run(connection, (err, result) => {
                return next();
            });
        });
    });

    server.method('db.setupChangefeedPush', () => {
        r.db(db).table(entriesTable).changes().run(conn, (err, cursor) => {
            cursor.each((err, item) => {
                server.publish('/clients/updates', item.new_val);
            });
        });
    }, { callback: false });

    server.method('db.saveEntry', (entry, callback) => {
        entry.online = true;
        entry.position = [];
        r.db(db).table(entriesTable).insert(entry).run(conn, callback);
    });

    server.method('db.updateEntry', (id, position, callback) => {
        r.db(db).table(entriesTable).get(id).run(conn, function(err, entry){
            console.log(entry);
            console.log(position)
            entry.position.push(position);
            r.db(db).table(entriesTable).get(id).update(entry).run(conn, callback);
        });
    });

    server.method('db.loadEntries', (callback) => {
        r.db(db).table(entriesTable).run(conn, callback);
    });

    server.subscription('/clients/updates');
};

exports.register.attributes = {
    pkg: {
        name: 'db',
        version: '1.0.0'
    }
}