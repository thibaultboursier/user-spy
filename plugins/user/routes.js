module.exports = function(server, options, next){
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
        path: '/clients',
        config: {
            id: 'clients-get',
            handler: function (request, reply) {
                server.methods.db.loadEntries((err, cursor) => {
                    if (err) {
                        return reply().code(500);
                    }

                    cursor.toArray((err, results) => {
                        reply(results).code(200);
                    });
                });
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/clients',
        config: {
            id: 'clients-put',
            handler: function (request, reply) {
                console.log(request, request.payload)
                const {id, position} = request.payload;

                server.methods.db.updateEntry(id, position, (err, cursor) => {
                    console.log(cursor)
                    if (err) {
                        return reply().code(500);
                    }

                    cursor.toArray((err, results) => {
                        reply(results).code(200);
                    });
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/clients',
        config: {
            id: 'clients-post',
            handler: function (request, reply) {
                server.methods.db.saveEntry(request.payload, (err, result) => {
                    const id = result.generated_keys[0];

                    if (err) {
                        return reply().code(500);
                    }

                    return reply({id}).code(200);
                });
            }
        }
    });

    next();
}