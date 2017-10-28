const register = {
    template: `
    <board news="vm.news" on-history-watch="vm.onHistoryWatch()"></board>
    <history queue="vm.queue" on-watch-end="vm.onWatchEnd()"></history>
    `,
    controllerAs: 'vm',
    controller: ['$window', '$timeout', '$scope', function ($window, $timeout, $scope) {
        let vm = this;

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
            vm.queue.push({ x, y, time: Date.now() });
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