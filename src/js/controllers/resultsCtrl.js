angular.module('App').controller('results', ['$scope','srvc', 'catSrvc', function($scope, srvc, catSrvc){

    $scope.results = {
        category: null,
        score: null,
        count: null
    }
    $scope.results = srvc.getResults();

    $scope.results.category = catSrvc.getCategory($scope.results.category);

    $scope.username = '';

    $scope.save = srvc.saveScore;

}])