'use strict';

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

    function getUpdatedModel(model, { old_val, new_val }) {
        if (!old_val && new_val) {
            model.push(new_val);
        }

        if (old_val && !new_val) {
            const itemToDelete = model.find(item => {
                return item.id === old_val.id;
            });

            if (itemToDelete) {
                const index = model.indexOf(itemToDelete);
                model.splice(index, 1);
            }
        }

        if (old_val && new_val) {
            console.log(old_val, new_val)
            let itemToUpdate = model.find(item => {
                return item.id === old_val.id;
            });

            if (itemToUpdate) {
                const index = model.indexOf(itemToUpdate);
                model[index] = new_val;
            }
        }

        return model;
    }

    return {
        loadAll,
        subscribeToClientsUpdate,
        getUpdatedModel
    }
}

module.exports = clientsService;