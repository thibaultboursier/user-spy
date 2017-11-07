'use strict';

const Nes = require('nes');

websockets.$inject = [];

function websockets() {
    return new Nes.Client('ws://localhost:3000');
}

module.exports = websockets;