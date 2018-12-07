var request     = require("request"),
    mongoose    = require("mongoose"),
    config      = require('./config.js'),
    Rank        = require("./models/lphistory");

//TODO change account Id to mongoose db get. 
var accountID = ['Z0aWnceXT3pE5ZYTTFrcP2IGwHjwVWWdHgbs3c3I9mB2qA', '7NbeYYUFBlPRg9w1274AEGb3rFPnKmfN0SZOE1LIkg', 'fAdYcMvFWZjqXHZIeMCp8gHznCwSrgQjTbdBzw6DcC4lplo'];


key = config.key;

mongoose.connect("mongodb://localhost/leaguesite");

// TODO add for each to leagueInfotoDB 
var leagueInfotoDB = function(accountArray){
    summonerInfo(accountArray[2])
        .then(leagueInfo)
        .then(matchInfo)
        .then(saveDB);
};

var summonerInfo = function(ID){
    var promise = new Promise(function(resolve, reject){
        request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/' + ID + '?api_key=' + key, function(error, response, body){
            var summoner = JSON.parse(body);

            newLeagueinfo = {
                summonerName        :   summoner.name,
                summonerID          :   summoner.id,
                summonerAccountId   :   summoner.accountId,
                summonerIcon        :   summoner.profileIconId
            }
            resolve(newLeagueinfo);
        });
    })
    return promise;
};

var leagueInfo = function(newLeagueinfo){
    var promise = new Promise(function(resolve, reject){
        request('https://na1.api.riotgames.com/lol/league/v4/positions/by-summoner/' + newLeagueinfo.summonerID + '?api_key=' + key, function(error, response, body){
            var league = (JSON.parse(body))[0];

            newLeagueinfo.tier          = league.tier;
            newLeagueinfo.rank          = league.rank;
            newLeagueinfo.wins          = league.wins;
            newLeagueinfo.losses        = league.losses;
            newLeagueinfo.leaguePoints  = league.leaguePoints;
            
            resolve(newLeagueinfo);
        });
    });
    return promise;
};

var matchInfo = function(newLeagueinfo){
    var promise = new Promise(function(resolve, reject){
        var timeNow = (new Date).getTime();
        var time24hrsAgo  = (timeNow) - 86400000;
        request('https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + newLeagueinfo.summonerAccountId + '?api_key=' + key + '&queue=420' + '&endTime=' + timeNow + '&beginTime=' + time24hrsAgo, function(error, response, body){
            var matchlists = JSON.parse(body);
            //Add match data to newLeagueinfo so we can save to db at end of promise chain
            newLeagueinfo.date    = new Date(timeNow);
            newLeagueinfo.season  = matchlists.matches[0].season;  
            newLeagueinfo.matches = matchlists.matches;

            resolve(newLeagueinfo);
        });
    });
    return promise;
};



var saveDB = function(newLeagueinfo){
    var league = new Rank(newLeagueinfo);

    league.save(function(err, league){
        if(err) return console.error(err);
        console.log(league);
    });
};






setInterval(() => leagueInfotoDB(accountID), 4000);

