'use strict';

const fs = require('fs');
const defaultFolderName = 'entities';

module.exports = function (server, { path, folderName = defaultFolderName }) {
    const { conn, db } = server.methods.db.get();
    const fullPath = require('path').join(path, folderName);

    if (!path) {
        throw new Error('entitiesLoader: path must be provided to load entities.')
    }

    server.app.entities = server.app.entities || {};

    fs.readdirSync(fullPath).forEach(file => {
        let entity = require(`${fullPath}/${file}`).factory({ conn, db, server });
        server.app.entities[entity.name] = entity;
    });
}