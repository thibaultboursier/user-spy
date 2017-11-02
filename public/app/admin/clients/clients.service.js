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

    function subscribeToClientsUpdate(cb) {
        ws.connect(function (err) {
            ws.subscribe('/clients/updates', handler, function (err) { });

            function handler(result) {
                cb(result);
            }
        });
    }

    function update(model, { old_val, new_val }) {
        if (!old_val && new_val) {
            model.push(new_val);
        }

        if (old_val && !new_val) {
            let itemToDelete = model.find(item => {
                return item.id === old_val.id;
            });

            if (itemToDelete) {
                index = model.indexOf(itemToDelete);
                model.splice(index, 1);
            }
        }

        if (old_val && new_val) {
            let itemToUpdate = model.find(item => {
                item.id === old_val.id;
            });

            if (itemToUpdate) itemToUpdate = new_val;
        }
    }

    return {
        loadAll,
        subscribeToClientsUpdate,
        update
    }
}

module.exports = clientsService;