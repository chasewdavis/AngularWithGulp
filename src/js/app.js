angular.module('App', ['ui.router'])
// .config([
//     '$routeProvider',
//     function($routeProvider) {
//         $routeProvider
//         .when('/', {
//             templateUrl: 'views/home.html',
//             controller: 'homeCtrl'
//         })
//     }
// ])

angular.module('App').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url:'/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })

        $urlRouterProvider.otherwise('/')
    }

])