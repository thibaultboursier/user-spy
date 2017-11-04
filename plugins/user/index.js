'use strict';

const routes = require('./routes');
const clientEntity = require('./entities/Client');

exports.register = function (server, options, next) {
    server.entities = {};
    const { conn, db } = server.methods.db.get();
    const opts = { db, conn, server };

    const normalizedPath = require("path").join(__dirname, "entities");
    let entities = {};

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        let entity = require("./entities/" + file).factory(opts);
        entities[entity.name] = entity;
    });

    server.app.entities = entities;

    routes.apply(null, arguments);

    next();
}

exports.register.attributes = {
    name: 'user',
    version: '1.0.0'
}