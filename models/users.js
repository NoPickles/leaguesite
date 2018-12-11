var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
    summonerName        : String,
    summonerID          : String,
    summonerAccountId   : String,
    summonerIcon        : Number,
    puuid               : String
});

module.exports = mongoose.model("Player", playerSchema);