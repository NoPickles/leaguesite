var express     = require("express");
var app         = express();

var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    Rank        = require("./models/lphistory"),
    help        = require("./healper.js");

mongoose.connect("mongodb://localhost/leaguesite");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/media/img"));


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/rank", function(req, res){
    // For Ajax call
    Rank.find({summonerName: "scarra"}, function(err, allRank){
        if(err){
            console.log(err);
        } else {
            res.send(JSON.stringify(allRank));
        }
    });
});


app.listen(3000, function(){
    console.log("Serving the meat");
});