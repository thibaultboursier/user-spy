module.exports = config;

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('admin', {
            abstract: true,
            url: '/admin'
        })
        .state('admin-history', {
            parent: 'admin',
            url: '/history',
            component: 'history'
        })
        .state('admin-clients', {
            parent: 'admin',
            url: '/clients',
            component: 'clients'
        });
}