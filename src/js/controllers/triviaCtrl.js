angular.module('App').controller('triviaCtrl', ['$scope', '$state', '$timeout', 'srvc' ,function($scope, $state, $timeout, srvc){

    $scope.index = 0;
    $scope.trivia = [];
    $scope.time_remaining = 11;
    $scope.score = 0;
    $scope.paused = true;
    $scope.correct;
    $scope.countCorrect = 0;
    $scope.incorrect_answers;
    var timer;

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    srvc.getQuestions()
    .then(function(res) {
        $scope.trivia = res;
        $scope.trivia.forEach( e => {
            console.log('e is...', e);
            let correctIndex = Math.floor( Math.random() * ( e.incorrect_answers.length + 1 ) );
            e.correctIndex = correctIndex;
            e.incorrect_answers.splice(correctIndex, 0, e.correct_answer);
        });
        $scope.trivia.forEach( e => {
            // e.question = e.question.replace(/&#039;/g, "\'");
            // e.question = e.question.replace(/&quot;/g, '\"');
            // // should find a much better way to do this
            // e.incorrect_answers = e.incorrect_answers.map( s => {
            //     return s.replace(/&#039;/g, '\'' )
            // })
            // e.incorrect_answers = e.incorrect_answers.map( s => {
            //     return s.replace(/&quot;/g, '\"' )
            // })

            e.question = decodeHtml(e.question);

            e.incorrect_answers = e.incorrect_answers.map(e => {
                return decodeHtml(e);
            })

            console.log('question is...', e.question);
            
            console.log('answers are...', e.incorrect_answers)
        })
        
        $scope.paused = false;

        $timeout(subtract, 0);

    });

    var subtract = function(){

        if($scope.time_remaining === 1){
            $scope.checkAnswer(10);
        }

        if( $scope.time_remaining > 0 ){
            $scope.time_remaining--;
            timer = $timeout( subtract, 1000 );
        }
    }

    $scope.checkAnswer = function(i){

        if($scope.trivia[$scope.index].correct_answer === $scope.trivia[$scope.index].incorrect_answers[i]){
            $scope.countCorrect++;

            $scope.trivia[$scope.index].points = 100;
            $scope.score += 100;

            if($scope.trivia[$scope.index].difficulty === 'medium'){
                $scope.trivia[$scope.index].points += 50;
                $scope.score += 50
            }else if($scope.trivia[$scope.index].difficulty === 'hard'){
                $scope.trivia[$scope.index].points += 100;
                $scope.score += 100
            }

            let timeBonus = $scope.time_remaining * 5
            $scope.trivia[$scope.index].points += timeBonus;
            $scope.score += timeBonus;

            $scope.correct = true;
        }else{
            $scope.trivia[$scope.index].points = 0;
            // $scope.score -= 50;
            $scope.incorrect = true;
        }
        $scope.trivia[$scope.index].userIndex = i;
        $timeout.cancel(timer);
        $scope.paused = true;
        // now on to the next question and reseting timers
        $timeout( function(){
            if($scope.index !== 9){
                $scope.index++;
                $scope.paused = false;
                $scope.time_remaining = 11;
                $scope.correct = false;
                $scope.incorrect = false;
                subtract();
            }else{
                // let rest of the app know how ya did // push to new route //
                srvc.setScore($scope.score, $scope.countCorrect, $scope.trivia);
                $state.go('results');
            }
        }, 1300)
    }

    $scope.resetTimerClass = function(){

        // kinda a hacky way to do this, looking for alternatives

        var elem = document.getElementById('timer_animation');

        if($scope.time_remaining===10){
            elem.classList.remove("start_timer");
            void elem.offsetWidth;
            elem.classList.add("start_timer");
        }

    }

}])