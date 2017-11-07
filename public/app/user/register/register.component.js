'use strict';

const register = {
    template: `
    <board news="vm.news" on-history-watch="vm.onHistoryWatch()"></board>
    <history queue="vm.queue" on-watch-end="vm.onWatchEnd()"></history>
    `,
    controllerAs: 'vm',
    controller: ['$window', '$timeout', '$scope', 'websockets', function ($window, $timeout, $scope, ws) {
        let vm = this;
        let id;

        vm.$onInit = onInit;

        function onInit(){
            ws.connect(function (err) {
                const request = {
                    path: '/clients',
                    method: 'POST',
                    payload: {
                        socket_id: ws.id,
                        positions: []
                    }
                };
                ws.request(request, function (err, result) {
                    if (err) throw err;
                    id = result.id;
                });
            });
        }

        function addPosition(position) {
            return new Promise((resolve, reject) => {
                const {id} = ws;
                
                ws.connect(err => {
                    const request = {
                        path: `/clients/${id}`,
                        method: 'PUT',
                        payload: {position}
                    };
                    ws.request(request, function (err, payload) {
                        if (err) throw err;
                    });
                });
            })
        }

        vm.queue = [];
        vm.news = [];
        vm.news.push('Registering mouse events ...');
        vm.onHistoryWatch = onHistoryWatch;
        vm.onWatchEnd = onWatchEnd;

        register();

        function register() {
            $window.addEventListener('mousemove', onMouseMove);

            $timeout(() => {
                $window.removeEventListener('mousemove', onMouseMove);
                vm.news.push(`Mouse events registered.`);
                $scope.$broadcast('register-end');
            }, 2000);
        }

        function onMouseMove({ clientX: x, clientY: y }) {
            addPosition({ x, y, time: Date.now() });
            console.log('position added')
            //vm.queue.push({ x, y, time: Date.now() });
        }

        function onHistoryWatch() {
            $scope.$broadcast('history-watch');
        }

        function onWatchEnd() {
            $scope.$broadcast('watch-end')
        }
    }]
}

module.exports = register;