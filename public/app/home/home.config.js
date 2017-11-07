'use strict';

module.exports = config;

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            template: `
            <ul>
                <li>
                    <a ui-sref="user">Connect as client</a>
                </li>
                <li>
                    <a ui-sref="admin-clients">See clients</a>     
                </li>   
            </ul>
            `
        })
}