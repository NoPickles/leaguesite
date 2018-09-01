var express     = require("express");
var app         = express();

var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    help        = require("./healper.js");

//mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/media/img"));




app.get("/", function(req, res){

    key = "RGAPI-d4a5869f-d4ae-456f-a957-898751d33474";


    var info = request('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/NoPickles?api_key=' + key, function(error, response, body){
       
        var summoner = JSON.parse(body);;

        var match = request('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + summoner.accountId + "?api_key=" + key, function(error, response, body){

            let matchlists = JSON.parse(body);

            // Alter MatchList Object so Landing view can use summoner names instead of IDs

            for(var i = 0; i < matchlists.matches.length; i++){
                
                matchlists.matches[i].champion = help.champNumToName(matchlists.matches[i].champion)
            }

            res.render("landing.ejs", {summoner: summoner, match: matchlists});
        });
        
    });

    
});



app.listen(3000, function(){
    console.log("Serving the meat");
});