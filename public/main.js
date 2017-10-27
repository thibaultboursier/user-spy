'use strict';

angular
    .module('spy', [
        'ngSanitize'
    ])
    .filter('trustAsHtml', function ($sce) { 
        return $sce.trustAsHtml; 
    })
    .component('handler', {
        template: `
        <board news="vm.news" on-history-watch="vm.onHistoryWatch()"></board>
        <history queue="vm.queue" on-watch-end="vm.onWatchEnd()"></history>
        `,
        controllerAs: 'vm',
        controller: ['$window', '$timeout', '$scope', function($window, $timeout, $scope){
            let vm = this;
        
            vm.queue = [];
            vm.news = [];
            vm.news.push('Registering mouse events ...');
            vm.onHistoryWatch = onHistoryWatch;
            vm.onWatchEnd = onWatchEnd;

            register();
            
            function register(){
                $window.addEventListener('mousemove', onMouseMove);

                $timeout(() => {
                    $window.removeEventListener('mousemove', onMouseMove);
                    vm.news.push(`Mouse events registered.`);
                    $scope.$broadcast('register-end');
                }, 2000);
            }
            
            function onMouseMove({clientX: x, clientY: y}) {
                vm.queue.push({x, y, time: Date.now()})
            }
            
            function onHistoryWatch(){
                $scope.$broadcast('history-watch');
            }

            function onWatchEnd(){
                $scope.$broadcast('watch-end')
            }
        }]
    })
    .component('history', {
        bindings: {
            queue: '<',
            onWatchEnd: '&'
        },
        template: `
        <div cursor ng-show="vm.isWatching" class="cursor"></div>
        `,
        controllerAs: 'vm',
        controller: ['$scope', '$timeout', function($scope, $timeout){
            let vm = this;
            let promise = Promise.resolve();

            vm.isWatching = false;

            $scope.$on('history-watch', watch);

            function watch(){
                vm.isWatching = true;

                vm.queue.reduce(reducer);

                promise = promise.then(() => {
                    vm.isWatching = false;
                    vm.onWatchEnd();
                });
            }

            function reducer (prev, curr){
                const {x, y, time} = curr;

                promise = promise.then(() => {
                    return new Promise((resolve, reject) => {
                        $timeout(function(time){
                            $scope.$broadcast('cursor-move', {x, y});
                            resolve();
                        }.bind(null, time), time - prev.time);
                    })
                });

                return curr;
            }
        }]
    })
    .directive('historyFrame', function(){
        return {
            bindToController: {
                url: '@'
            },
            restrict: 'E',
            template: `
            <iframe src="{{ vm.url }}" width="100%" height="600" frameBorder="2"></iframe>
            `,
            controllerAs: 'vm',
            controller: function(){},
            link: function ($scope, $element, $attrs, ctrl) {
                const iframe = $element.find('iframe');

                iframe.on('load', function(){
                    const document = iframe[0].contentWindow.document;
                    const body = document.body;
                    
                });
                
            }
        }
    })
    .directive('cursor', function(){
        return {
            restrict: 'A',
            link: function($scope, element){
                $scope.$on('cursor-move', move);

                function move(event, {x, y}){
                    element[0].style.top = `${y}px`;
                    element[0].style.left = `${x}px`;
                }
            }
        }
    })
    .component('board', {
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

            function watchHistory(){
                vm.isWatching = true;
                vm.onHistoryWatch();
            }

            function onRegisterEnd(){
                vm.canWatchHistory = true;
            }

            function onWatchEnd(){
                vm.isWatching = false;
                $scope.$applyAsync();
            }
        }]
});