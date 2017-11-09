'use strict';

const EventEmitter = require('events').EventEmitter;
const config = require('./config');

const eventEmitter = new EventEmitter();

module.exports = {
    "connections": config.servers,
    "registrations": [
        {
            "plugin": {
                "register": "blipp"
            }
        },
        {
            "plugin": {
                "register": "inert"
            }
        },
        {
            "plugin": {
                "register": "./database",
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "./websockets",
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "./utils",
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "./user",
                "options": {}
            }
        }
    ]
}