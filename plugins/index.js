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

    server.route({
        method: 'GET',
        path: '/hello',
        config: {
            id: 'hello',
            handler: function(request, reply){
                reply('hiiii !')
            }
        }
    });
    server.subscription('/foo');

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
}