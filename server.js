'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest.js');
const options = {
    relativeTo: `${__dirname}/plugins`
};

Glue.compose(manifest, options)
    .then(server => {
        server.start(err => {
            if (err) throw err;
            
            console.log('Application is running.');
        })
    });