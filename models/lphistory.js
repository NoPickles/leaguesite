var mongoose = require("mongoose");

var leaguepointsSchema = new mongoose.Schema({
    summonerName        : String,
    summonerID          : String,
    summonerAccountId   : String,
    summonerIcon        : Number,
    tier                : String,
    rank                : String,
    season              : Number,
    wins                : Number,
    losses              : Number,
    leaguePoints        : Number,
    matches             : Array,
    date                : String
});

module.exports = mongoose.model("Rank", leaguepointsSchema);
