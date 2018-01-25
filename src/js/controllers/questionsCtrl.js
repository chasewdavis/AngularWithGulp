angular.module('App').controller('finishedQuestions', ['$scope', 'srvc', function($scope, srvc){
    $scope.qs = srvc.getFinishedQuestions();
    $scope.currentIndex = 0;
    $scope.changeIndex = function(arg){
        if(typeof arg ==='number'){
            $scope.currentIndex = arg;
        }else if(arg === 'up'){
            $scope.currentIndex === 9 ? $scope.currentIndex = 0 : $scope.currentIndex++;
        }else{
            $scope.currentIndex === 0 ? $scope.currentIndex = 9 : $scope.currentIndex--;
        }
    }

}])