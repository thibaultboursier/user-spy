clientsService.$inject = ['websockets'];

function clientsService(ws) {

    function loadAll() {
        return new Promise((resolve, reject) => {
            ws.connect(err => {
                ws.request('/clients', (err, payload) => {
                    if (err) reject(err);

                    return resolve(payload);
                });
            });
        })
    }

    return {
        loadAll
    }
}

module.exports = clientsService;