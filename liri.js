require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

// console.log(spotify);

var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";

for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

switch (command) {

    case "spotify-this-song":
        if (x) {
            spotifySong(x);
            break;
        } else {
            spotifySong("The Sign");
        }

    case "movieThis":
        if (x) {
            movieThis(x);
            break;
        } else {
            movieThis("Mr. Nobody");
        }
}

function spotifySong(x) {

    spotify.search({ type: 'track', query: x }, function (err, data) {
        if (err) {
            log.info('Error occurred: ' + err);
            return;
        };

        var data = data.tracks.items

        console.log("========================")
        console.log("The Artist is: " + data[0].artists[0].name);
        console.log("The song title is: " + data[0].name);
        console.log("Preview Link: " + data[0].preview_url);
        console.log("The album title is: " + data[0].album.name);
    });
}

// OMDB = instead of spotify.search, you're calling directly to the URL. NODE.JS Activity 17/18