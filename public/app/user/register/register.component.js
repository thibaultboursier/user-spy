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
                    payload: {}
                };
                ws.request(request, function (err, result) {
                    if (err) throw err;
                    id = result.id;
                    console.log('payload', payload);
                });
            });
        }

        function addPosition(position) {
            return new Promise((resolve, reject) => {
                ws.connect(err => {
                    const request = {
                        path: '/clients',
                        method: 'PUT',
                        payload: {id, position}
                    };
                    ws.request(request, function (err, payload) {
                        if (err) throw err;
        
                        console.log('payload', payload);
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
            console.log('register')
            $window.addEventListener('mousemove', onMouseMove);

            $timeout(() => {
                $window.removeEventListener('mousemove', onMouseMove);
                vm.news.push(`Mouse events registered.`);
                $scope.$broadcast('register-end');
            }, 2000);
        }

        function onMouseMove({ clientX: x, clientY: y }) {
            console.log('move')
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