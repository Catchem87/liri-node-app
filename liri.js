require("dotenv").config();

var fs = require('fs');
var moment = require('moment');

// fs.writeFile("random.txt")

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axois = require('axios');



var command = process.argv[2];
var input = process.argv.splice(3).join(' ');

function concertThis() {
    axois.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=de3b2d5fb097c9be2422bde5146a2f8f").then(
        function(response) {
            for(var i = 0; i < response.data.length; i++) {
                // console.log(response.data);
                response.data.map(item => {
                    console.log('\nVenue Name: ' + item.venue.name + '\nVenue Location: ' + item.venue.city + ', ' + item.venue.country + '\nDate: ' + moment(item.datetime).format("MM/DD/YYYY") );
                })
            }
        },
        function(error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if(error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    )
}



function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        for (var i = 0; i < data.tracks.items.length; i++) {
            //console.log(data.tracks.items[i].artists);
            data.tracks.items[i].artists.map(track => {
                console.log('Artist name: ' + track.name + '\nAlbum name: ' + data.tracks.items[i].album.name + '\nSong Title: ' + data.tracks.items[i].name + '\nSong Preview: ' + data.tracks.items[i].preview_url);
            })
        }
    });
};


if (command === "spotify-this-song") {
    spotifyThisSong();
}

if (command === "concert-this") {
    concertThis();
}

if (command === "movie-this") {
    movieThis();
}

if(command === "do-what-it-says") {

}