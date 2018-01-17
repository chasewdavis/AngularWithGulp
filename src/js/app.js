angular.module('app', [
    'ngRoute'

])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
    }
])