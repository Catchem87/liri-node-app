require("dotenv").config();

// const result = dotenv.config();

// if(result.error) {
//     throw result.error
// };

// console.log(result.parsed);

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var command = process.argv[2];
var input = process.argv.splice(3).join(' ');



function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items);
    
        for(var i = 0; i < data.tracks.items.length; i++) {
            
            console.log('Data: ' + data.tracks.items[i].artists);
            // console.log('Album name: ' + data.tracks.items[i].album.name);
        }
    });
};


if(command === "spotify-this-song") {
    spotifyThisSong();
}