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

    case "movie-this":
        if (x) {
            movieThis(x);
            break;
        } else {
            movieThis("Mr. Nobody");
        }

    case "concert-this":
        if (x) {
            concertThis(x);
            break;
        } else {
            concertThis("Drake");
        }

    case "do-what-it-says":
        doSays();
        break;
         
}

function spotifySong(x) {

    spotify.search({ type: 'track', query: x }, function (err, data) {
        if (err) {
            log.info('Error occurred: ' + err);
            return;
        };

        var data = data.tracks.items

        console.log("========================")
        console.log("ARTIST: " + data[0].artists[0].name);
        console.log("TITLE: " + data[0].name);
        console.log("PREVIEW LINK: " + data[0].preview_url);
        console.log("ALBUM " + data[0].album.name);
        console.log("========================")
    });
}

function movieThis(x) {

    var movieQueryUrl = "http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy";
    
    request(movieQueryUrl, function (error, response, body) {


        console.log("========================");
        console.log("TITLE: " + JSON.parse(body).Title);
        console.log("RELEASE DATE: " + JSON.parse(body).Year);
        console.log("IMDB RATING: " + JSON.parse(body).imdbRating);
        console.log("ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[2].Value);
        console.log("COUNTRY OF ORIGIN: " + JSON.parse(body).Country);
        console.log("LANGUAGE: " + JSON.parse(body).Language);
        console.log("PLOT: " + JSON.parse(body).Plot);
        console.log("ACTORS: " + JSON.parse(body).Actors);
        console.log("========================")
    });
};

function concertThis(x) {

    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + x + "/events?app_id=codingbootcamp";
    
    request(concertQueryUrl, function (error, response, body) {

        var band = JSON.parse(body);

        console.log("========================")
        console.log("VENUE: " + band[0].venue.name);
        console.log("LOCATION: "  + band[0].venue.city + ", " + band[0].venue.country);
        console.log("DATE:  " + moment(band[0].datetime).format('LLL'));
        console.log("========================")

    });
};

function doSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if ( error ) {
            log.info('Error occurred: ' + error);
            return;
        }  
        spotifySong(data); 
        
    });
};