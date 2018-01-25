angular.module('App').controller('demoCtrl', ['$scope', 'srvc', function($scope, srvc){

    $scope.questions = srvc.getFinishedQuestions();

    $scope.currentIndex = 9;

    var pages = document.getElementsByClassName('pages')[0];
    pages.addEventListener('touchstart', handleStart, false)
    pages.addEventListener('touchmove', handleMove, false)
    pages.addEventListener('touchend', handleStop, false)

    var initialOffset = pages.offsetWidth * 2 / 5;
    var thresholdX = pages.offsetWidth * 1 / 15;
    var initialX;
    var currentX;
    var changeInX;
    var currentDistance;
    var totalDistance=0;

    function handleStart(e){
        e.preventDefault();
        initialX = e.changedTouches[0].screenX;
    }

    function handleMove(e){
        currentX = e.changedTouches[0].screenX;
        changeInX = currentX-initialX;
        pages.style.transform = `translate(${changeInX+totalDistance-initialOffset}px)`
    }

    function handleStop(){
        totalDistance += currentX-initialX;
        // move to next slide if swipe is long enough
        if( changeInX > thresholdX ){
            console.log('move right')
        }else if ( changeInX < -thresholdX ){
            console.log('move left')
        }
    }

    //show two cards before current card, and two cards after current card
    $scope.cards;

    if($scope.currentIndex > 1 && $scope.currentIndex < 8) {
        $scope.cards = $scope.questions.slice($scope.currentIndex-2,$scope.currentIndex+3)
    } else if ($scope.currentIndex <= 1 ) {
        $scope.cards = $scope.questions.slice(0, $scope.currentIndex + 3)
        var remaining = 5 - $scope.cards.length;
        $scope.cards.unshift( ...$scope.questions.slice( $scope.questions.length - remaining ) )
    } else if ($scope.currentIndex >= 8) {
        $scope.cards = $scope.questions.slice( $scope.currentIndex - 2 );
        var remaining = 5 - $scope.cards.length;
        $scope.cards.push( ...$scope.questions.slice(0, remaining ) )
    }
    

}])