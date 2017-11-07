'use strict';

const config = require('./config');

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
                "register": "nes"
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