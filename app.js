var express     = require("express");
var app         = express();

var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    League      = require("./models/lphistory"),
    help        = require("./healper.js");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/media/img"));



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/league", function(req, res){
    // For Ajax call
    League.find({}, function(err, allLeague){
        if(err){
            console.log(err);
        } else {
            res.send(JSON.stringify(allLeague));
        }
    });
});


app.listen(3000, function(){
    console.log("Serving the meat");
});