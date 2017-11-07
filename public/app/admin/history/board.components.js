'use strict';

const board = {
    bindings: {
        news: '<',
        onHistoryWatch: '&'
    },
    controllerAs: 'vm',
    template: `
    <ul class="list-group" ng-if="vm.news">
        <li ng-repeat="new in vm.news" ng-bind-html="new | trustAsHtml" class="list-group-item"></li>
        <li ng-if="vm.canWatchHistory" class="list-group-item">
            <button type="button" ng-click="vm.watchHistory()" ng-disabled="vm.isWatching" class="btn btn-primary btn-sm">Watch history</button>
        </li>
    </ul>
    `,
    controller: ['$scope', function ($scope) {
        let vm = this;

        vm.isWatching = false;
        vm.watchHistory = watchHistory;

        $scope.$on('register-end', onRegisterEnd);
        $scope.$on('watch-end', onWatchEnd);

        function watchHistory() {
            vm.isWatching = true;
            vm.onHistoryWatch();
        }

        function onRegisterEnd() {
            vm.canWatchHistory = true;
        }

        function onWatchEnd() {
            vm.isWatching = false;
            $scope.$applyAsync();
        }
    }]
}

module.exports = board;