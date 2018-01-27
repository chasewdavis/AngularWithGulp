angular.module('App').controller('finishedQuestions', ['$scope', 'srvc', '$timeout', '$window', function($scope, srvc, $timeout, $window){

    //----First Section will be used on both mobile and full size laptops / desktops.----//

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

    //-----Next section is for the mobile / tablet only touch carousel.----//
    //-----I realize that there are plenty of pre built libraries for this----// 
    //-----but I'd rather build one from scratch-----// 
    //-----Fasten your seatbelts, the code gets pretty heavy.-----//

    //first off, if we are on mobile, I want to shorten long question category names
    $window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    if( $window.mobilecheck() ){
        $scope.qs = $scope.qs.map(e => {
            if(e.category.length > 16){ e.difficulty = e.difficulty.replace('medium', 'med') };
            e.category = e.category.replace('Entertainment: ', '');
            e.category = e.category.replace('& Manga', '');
            e.category = e.category.replace('Cartoon & Animations', 'Cartoons')
            e.category = e.category.replace('Science & Nature', 'Science')
            // and finally
            if(e.category.length > 15){
                e.category = e.category.slice(0, 11)
                e.category += '...'
            }
            return e;
        })
    }

    // next up are the mechanics behind the carousel itself

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
                $scope.currentIndex === 9 ? $scope.currentIndex = 0 : $scope.currentIndex++;
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

        console.log($scope.currentIndex)

        if($scope.currentIndex > 1 && $scope.currentIndex < 8) {
            $scope.cards = $scope.qs.slice($scope.currentIndex-2,$scope.currentIndex+3)
        } else if ($scope.currentIndex <= 1 ) {
            $scope.cards = $scope.qs.slice(0, $scope.currentIndex + 3)
            var remaining = 5 - $scope.cards.length;
            $scope.cards.unshift( ...$scope.qs.slice( $scope.qs.length - remaining ) )
        } else if ($scope.currentIndex >= 8) {
            $scope.cards = $scope.qs.slice( $scope.currentIndex - 2 );
            var remaining = 5 - $scope.cards.length;
            $scope.cards.push( ...$scope.qs.slice(0, remaining ) )
        }

        console.log($scope.cards)

    }

    displayCards();


}])