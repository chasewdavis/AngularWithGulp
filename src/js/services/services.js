angular.module('App').service('srvc', function($http){

    var category = null;
    var difficulty = null;
    var score = 0;
    var count = 0;
    var finsihedQuestions = [];

    var approveUsername = function(username){
        var badWords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
        if(badWords.includes(username)){
            // console.log('cant use that name');
            return false;
        }else{
            // console.log('great name');
            return true;
        }
    }

    this.setQuestions = function(cat, diff){
        category = cat;
        difficulty = diff;
    }

    this.setScore = function(pts, cc, qs){
        score = pts;
        count = cc;
        finsihedQuestions = qs;
    }

    this.getQuestions = function(){

        if(!category && !difficulty){
            return $http.get(`https://opentdb.com/api.php?amount=10`)
            .then( res => res.data.results )
            .catch( err => console.log('Error getting questions', err) )
        }else if( !category ){
            return $http.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
            .then( res => res.data.results )
            .catch( err => console.log('Error getting questions', err) )
        }else if ( !difficulty || difficulty==='any' ){
            return $http.get(`https://opentdb.com/api.php?amount=10&category=${category}`)
            .then( res => res.data.results )
            .catch( err => console.log('Error getting questions', err) )
        }

        return $http.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
        .then( res => res.data.results)
        .catch(err => console.log('Error getting questions:', err))
    }

    this.getResults = function(){
        console.log('from results count is...', count)
        return { 
            category: category, 
            score: score,
            count: count 
        }
    }

    this.getFinishedQuestions = function(){
        return finsihedQuestions;
        // so I don't have to play the game every 5 seconds
        // return [{"category":"Science & Nature","type":"boolean","difficulty":"medium","question":"The Neanderthals were a direct ancestor of modern humans.","correct_answer":"False","incorrect_answers":["True","False"],"correctIndex":1,"userIndex":10},{"category":"History","type":"multiple","difficulty":"medium","question":"All of the following are names of the Seven Warring States EXCEPT:","correct_answer":"Zhai (翟)","incorrect_answers":["Zhao (趙)","Qin (秦)","Zhai (翟)","Qi (齊)"],"correctIndex":2,"userIndex":1},{"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"What is isobutylphenylpropanoic acid more commonly known as?","correct_answer":"Ibuprofen","incorrect_answers":["Morphine","Ibuprofen is the correct answer","Ketamine","Aspirin"],"correctIndex":1,"userIndex":10},{"category":"History","type":"boolean","difficulty":"easy","question":"Adolf Hitler was a german soldier in World War I.","correct_answer":"True","incorrect_answers":["False","True"],"correctIndex":1,"userIndex":0},{"category":"Entertainment: Books","type":"multiple","difficulty":"medium","question":"The novel \"Of Mice And Men\" was written by what author? ","correct_answer":"John Steinbeck ","incorrect_answers":["George Orwell","Mark Twain ","John Steinbeck ","Harper Lee"],"correctIndex":2,"userIndex":0},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"The creator of the Touhou Project series is:","correct_answer":"ZUN","incorrect_answers":["SUN","RUN","ZUN","PUN"],"correctIndex":2,"userIndex":2},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What tiny principality lies between Spain and France?","correct_answer":"Andorra","incorrect_answers":["Andorra","Liechtenstein","Monaco","San Marino"],"correctIndex":0,"userIndex":2},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"In the anime Noragami who is one of the main protagonists?","correct_answer":"Yukine","incorrect_answers":["Karuha","Mineha","Yukine","Mayu"],"correctIndex":2,"userIndex":2},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"Who was the director of \"Scott Pilgrim vs. the World (2010)\"?","correct_answer":"Edgar Wright","incorrect_answers":["Phil Lord","Chris Miller","Seth Rogan","Edgar Wright"],"correctIndex":3,"userIndex":1},{"category":"Politics","type":"multiple","difficulty":"medium","question":"Before 2016, in which other year did Donald Trump run for President?","correct_answer":"2000","incorrect_answers":["2000","2012","1988","2008"],"correctIndex":0,"userIndex":2}];
        // return [{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?","correct_answer":"Demolition","incorrect_answers":["Demolition","The Dream Team","The Bushwhackers","The British Bulldogs"],"correctIndex":0,"userIndex":0},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Video streaming website YouTube was purchased in it's entirety by Facebook for US$1.65 billion in stock.","correct_answer":"False","incorrect_answers":["True","False"],"correctIndex":1,"userIndex":1},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What is \"dabbing\"?","correct_answer":"A dance","incorrect_answers":["A dance","A medical procedure","A sport","A language"],"correctIndex":0,"userIndex":1},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Nutella is produced by the German company Ferrero.","correct_answer":"False","incorrect_answers":["True","False"],"correctIndex":1,"userIndex":1},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What was the nickname given to the Hughes H-4 Hercules, a heavy transport flying boat which achieved flight in 1947?","correct_answer":"Spruce Goose","incorrect_answers":["Spruce Goose","Noah's Ark","Fat Man","Trojan Horse"],"correctIndex":0,"userIndex":2},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"In 2010, Twitter and the United States Library of Congress partnered together to archive every tweet by American citizens.","correct_answer":"True","incorrect_answers":["False","True"],"correctIndex":1,"userIndex":1},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Adolf Hitler was born in Australia. ","correct_answer":"False","incorrect_answers":["False","True"],"correctIndex":0,"userIndex":0},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"Which of the following card games revolves around numbers and basic math?","correct_answer":"Uno","incorrect_answers":["Uno","Go Fish","Twister","Munchkin"],"correctIndex":0,"userIndex":0},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Dihydrogen Monoxide was banned due to health risks after being discovered in 1983 inside swimming pools and drinking water.","correct_answer":"False","incorrect_answers":["True","False"],"correctIndex":1,"userIndex":1},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Scotland voted to become an independent country during the referendum from September 2014.","correct_answer":"False","incorrect_answers":["True","False"],"correctIndex":1,"userIndex":0}]
    }

    this.saveScore = function(username, category, score){
        // console.log('username:',username, 'category:',category, 'score:',score);

        if(approveUsername(username) && username && score){
            $http.post(`/api/postScore`, {'username':username,'category':category,'score':score})
            .then(res => console.log(res))
            .catch(err => console.log('error from save score:', err))
        }

    }

    this.getScores = function(){
        return $http.get(`/api/getScores`).then(res => res.data);
    }
    
})