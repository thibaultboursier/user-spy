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

    server.route({
        method: 'GET',
        path: '/mousemove',
        config: {
            id: 'mousemove',
            handler: function(request, reply){
                console.log(request)
            }
        }
    });

    server.subscription('/foo');

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
}