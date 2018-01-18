// angular.module('App').controller('homeCtrl', ['$scope', function($scope){
//     $scope.message = 'We did it!'
// }])

// angular.module('App').controller('selectCtrl', ['$scope', 'srvc', 'catSrvc', function($scope, srvc, catSrvc ){
    angular.module('App').controller('homeCtrl', ['$scope', 'srvc', 'catSrvc', function($scope, srvc, catSrvc){
    $scope.categories = [
        {'cat':'Sports','sel':false, 'id': 21},
        {'cat':'Geography','sel':false, 'id': 22 },
        {'cat':'Computer Science','sel':false,'id': 18},
        {'cat':'Television','sel':false,'id': 14},
        {'cat':'General Knowledge','sel':false, 'id': 9},
        {'cat':'Movies','sel':false,'id': 11},
        {'cat':'History','sel':false,'id': 23}
    ];

    srvc.getScores().then( scores =>  $scope.highscores = scores );

    $scope.highscores = [];

    $scope.highscoresByCategory = [];

    $scope.category = null;
    $scope.difficulty = null;

    $scope.selectCat = function(index){  
        $scope.categories.forEach(e => {
            e.sel = false
        })
        $scope.categories[index].sel = true;
        $scope.category = $scope.categories[index].id
        $scope.highscoresByCategory = $scope.highscores.filter(e => {
            return e.category === catSrvc.getCategory($scope.category);
        }).sort( (a,b) => {
            return b.score - a.score;
        })
    }

    $scope.selectDiff = function(difficulty){
        $scope.difficulty = difficulty;
    }

    // $scope.callSrvc = function(cat,diff){
    //     // console.log('cat and diff are...', cat, diff)
    //     srvc.setQuestions(cat, diff)
    // }

}])