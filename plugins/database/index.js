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
};

exports.register.attributes = {
    name: 'database',
    version: '1.0.0'
}