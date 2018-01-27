angular.module('App').controller('demoCtrl', ['$scope', 'srvc', '$timeout', function($scope, srvc, $timeout){

    $scope.questions = srvc.getFinishedQuestions();

    $scope.currentIndex = 4;

    var pages = document.getElementsByClassName('pages')[0];
    pages.addEventListener('touchstart', handleStart, false)
    pages.addEventListener('touchmove', handleMove, false)
    pages.addEventListener('touchend', handleStop, false)

    var singlePageWidth = pages.offsetWidth / 5;
    var initialOffset = pages.offsetWidth * 2 / 5;
    var thresholdX = singlePageWidth / 3;
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
        // move to next or previous slide according to swipe gesture
        if( changeInX > thresholdX ){
            pages.style.transition = 'all .3s';
            pages.style.transform = `translate(${-initialOffset + singlePageWidth }px)`;
            $timeout(function(){
                pages.style.transition = 'none';
                totalDistance = 0;
                $scope.currentIndex ? $scope.currentIndex-- : $scope.currentIndex = 9;
                displayCards();
                pages.style.transform = `translate(${-initialOffset}px)`;
            },300);
        } else if ( changeInX < -thresholdX ){
            pages.style.transition = 'all .3s';
            pages.style.transform = `translate(${-initialOffset - singlePageWidth }px)`;
            $timeout(function(){
                pages.style.transition = 'none';
                totalDistance = 0;
                $scope.currentIndex === 10 ? $scope.currentIndex = 0 : $scope.currentIndex++;
                displayCards();
                pages.style.transform = `translate(${-initialOffset}px)`;
            },300);
        } else {
            pages.style.transition = 'all .3s';
            pages.style.transform = `translate(${-initialOffset}px)`;
            $timeout(function(){
                pages.style.transition = 'none';
                totalDistance = 0;
            },300);
        }
    }

    //show two cards before current card, and two cards after current card
    $scope.cards;

    function displayCards(){

        // console.log($scope.currentIndex)

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

        // console.log($scope.cards)

    }

    displayCards();
    

}])