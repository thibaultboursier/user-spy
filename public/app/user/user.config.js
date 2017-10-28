module.exports = config;

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            template: '<register></register>'
        })
}