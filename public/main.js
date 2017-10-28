'use strict';

const Nes = require('nes');
const angular = require('angular');
const angularSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');

const client = new Nes.Client('ws://localhost:3000');

client.connect(err => {
    if (err) throw err;
    
    client.request('hello', (err, payload) => {
        console.log(payload);
    })
})

const app = require('./app/app.module');