'use strict';

const history = {
    bindings: {
        queue: '<',
        onWatchEnd: '&'
    },
    template: `
    <div cursor ng-show="vm.isWatching" class="cursor"></div>
    `,
    controllerAs: 'vm',
    controller: ['$scope', '$timeout', function ($scope, $timeout) {
        let vm = this;
        let promise = Promise.resolve();

        vm.isWatching = false;

        $scope.$on('history-watch', watch);

        function watch() {
            vm.isWatching = true;

            vm.queue.reduce(reducer);

            promise = promise.then(() => {
                vm.isWatching = false;
                vm.onWatchEnd();
            });
        }

        function reducer(prev, curr) {
            const { x, y, time } = curr;

            promise = promise.then(() => {
                return new Promise((resolve, reject) => {
                    $timeout(function (time) {
                        $scope.$broadcast('cursor-move', { x, y });
                        resolve();
                    }.bind(null, time), time - prev.time);
                })
            });

            return curr;
        }
    }]
}

module.exports = history;

