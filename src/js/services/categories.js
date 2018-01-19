angular.module('App').service('catSrvc', function(){

    var categories = {
        '9':'General Knowledge',
        '11':'Movies',
        '14':'Television',
        '18':'Computer Science',
        '21':'Sports',
        '22':'Geography',
        '23':'History'   
    }

    this.getCategory = function(number){
        if(number){
            number = number.toString();
            return categories[number];
        }
    }

})