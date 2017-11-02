const clients = {
    bindings: {},
    controllerAs: 'vm',
    templateUrl: './app/admin/clients/clients.template.html',
    controller: ['$scope', 'websockets', 'clientsService', function ($scope, ws, clientsService) {
        let vm = this;

        vm.$onInit = onInit;
        vm.loadAll = loadAll;
        vm.clients = [];

        function onInit() {
            vm.loadAll()
                .then(() => {
                    clientsService.subscribeToClientsUpdate(onListUpdate)
                });
        }

        function onListUpdate(changes) {
            clientsService.update(vm.clients, changes);
            $scope.$apply();
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
    }]
}

module.exports = clients;