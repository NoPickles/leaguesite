var mongoose = require("mongoose");

var leaguepointsSchema = new mongoose.Schema({
    summonerName        : String,
    summonerID          : String,
    summonerAccountId   : String,
    summonerIcon        : Number,
    league              : Array,
    matches             : Array,
    date                : String
});

module.exports = mongoose.model("Rank", leaguepointsSchema);
