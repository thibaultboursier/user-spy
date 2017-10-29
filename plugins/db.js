const r = require('rethinkdb');

const db = 'hapi_timeline';
const entriesTable = 'entries';
let conn;

exports.register = function (server, options, next) {
    r.connect((err, connection) => {
        if (err) return next(err);

        conn = connection;

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

    next();
};

exports.register.attributes = {
    pkg: {
        name: 'db',
        version: '1.0.0'
    }
}