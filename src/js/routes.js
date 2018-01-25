angular.module('App').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url:'/',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    }).state('trivia', {
        url: '/trivia',
        templateUrl: 'views/trivia.html',
        controller: 'triviaCtrl'
    }).state('results', {
        url: '/results',
        templateUrl: 'views/results.html',
        controller: 'results'
    }).state('questions', {
        url: '/questions',
        templateUrl: 'views/questions.html',
        controller: 'finishedQuestions'
    }).state('demo', {
        url: '/demo',
        templateUrl: 'views/demo.html',
        controller: 'demoCtrl'
    })

    $urlRouterProvider.otherwise('/')
}

])