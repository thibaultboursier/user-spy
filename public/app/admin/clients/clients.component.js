const clients = {
    bindings: {},
    controllerAs: 'vm',
    template: `
    <h2>Connected clients :</h2>
    <ul>
        <li ng-repeat="client in clients">{{ client }}</li>
    </ul>
    `,
    controller: ['websockets', function (ws) {
        let vm = this;

        vm.clients = [];

        ws.connect(function (err) {
            ws.subscribe('/clients/updates', handler, function (err) { });

            function handler(item) {
                console.log('client updates :', item);
            }
        });
    }]
}

module.exports = clients;