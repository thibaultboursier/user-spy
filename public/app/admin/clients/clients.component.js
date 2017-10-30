const clients = {
    bindings: {},
    controllerAs: 'vm',
    template: `
    <h2>Connected clients :</h2>
    <ul>
        <li ng-repeat="client in vm.clients">{{ client.id }}</li>
    </ul>
    `,
    controller: ['$scope', 'websockets', 'clientsService', function ($scope, ws, clientsService) {
        let vm = this;

        vm.$onInit = onInit;
        vm.loadAll = loadAll;
        vm.subscribeToClientsUpdate = subscribeToClientsUpdate;
        vm.clients = [];

        function onInit() {
            vm.loadAll()
                .then(vm.subscribeToClientsUpdate);
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

        function subscribeToClientsUpdate() {
            ws.connect(function (err) {
                ws.subscribe('/clients/updates', handler, function (err) { });

                function handler(item) {
                    console.log('client updates :', item);
                    $scope.$applyAsync(() => {
                        vm.clients.push(item);
                    });
                }
            });
        }
    }]
}

module.exports = clients;