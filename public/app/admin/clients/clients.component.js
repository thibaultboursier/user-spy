'use strict';

const clients = {
    bindings: {},
    controllerAs: 'vm',
    templateUrl: './app/admin/clients/clients.template.html',
    controller: ['$scope', 'websockets', 'clientsService', function ($scope, ws, clientsService) {
        let vm = this;

        vm.$onInit = onInit;
        vm.loadAll = loadAll;
        vm.filter = filter;
        vm.isOnline = isOnline;
        vm.clients = [];

        function onInit() {
            vm.loadAll()
                .then(() => {
                    clientsService.subscribeToClientsUpdate(onListUpdate)
                });
        }

        function onListUpdate(changes) {
            $scope.$applyAsync(() => {
                const model = vm.clients.slice();
                const updatedModel = clientsService.getUpdatedModel(model, changes);
                vm.clients = updatedModel.filter(filter);
            });
        }

        function loadAll() {
            return clientsService
                .loadAll()
                .then(clients => {
                    $scope.$applyAsync(() => {
                        vm.clients = clients;
                    });
                });
        }

        function filter(client) {
            return isOnline(client);
        }

        function isOnline(client) {
            return client.online === true;
        }
    }]
}

module.exports = clients;