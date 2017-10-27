const Nes = require('nes/client');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
    server.subscription('/timeline/updates');

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
}