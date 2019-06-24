` Require .env file `
require("dotenv").config();

` Require request `
let request = require("request");

var moment = require("moment");

var fs = require("fs");

` Link to key page `
var keys = require("./keys.js");

` Initialize spotify `
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

` omdb and bands in town API `
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

function userCommand(userInput, userQuery){
    switch (userInput){
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;
        case "commands":
            showCommands();
            break;
        default:
            console.log("Please enter a valid command");
            break;
    }
};
userCommand (userInput, userQuery);
// node liri.js concert-this <artist/band name here>
function concertThis() {
    console.log("Getting the information you requested");

    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp",function(error,Response){
        // if (!error && Response.statusCode === 200){
        //     let userBand = JSON.parse(body);
        if (error) {
            return console.log("Error occurred ");
        }
            if (userQuery.length > 0){
                for (var i=0; i < 1; i++){
                    // display the name of the venue
                    console.log("Venue: ");
                    // display the venue location
                    console.log("Location: ");
                    // display the date of the event in MM/DD/YYYY
                    console.log("Event Date: ");

                let concertDate = moment(userQuery[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log("Date and Time: " + $(concertDate));
                };
            } 
            else {
                console.log("Information not found");
            
        };
    });
};
        
// node liri.js spotify-this-song '<song name here>'
function spotifyThisSong(){
    console.log("Getting the information you requested");
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
    if (error) {
        return console.log("Error occurred ");
    }
    let spotifyArr = data.tracks.items;
// console.log(spotifyArr);
    for (var i=0; i < spotifyArr.length; i++){

        // display artist
        console.log("Artist: "+JSON.stringify(spotifyArr[i].artists[0].name));
        // display song name
        console.log("Song name: " +spotifyArr[i].name);
        // display a preview link of the song from Spotify
        console.log("Song preview: "+spotifyArr[i].preview_url);
        // display the album that the song is from
        console.log("Album name: "+spotifyArr[i].album.name);
    };
});

}
// node liri.js movie-this '<movie name here>'
function movieThis(){
    console.log("Getting the information you requested");
    if (!userQuery){userQuery = "mr nobody";
                };
            // var axios = require("axios");
            axios.get("http://www.omdbapi.com/?t=" + userQuery + "&apikey=1d86f0e6").then(function(response){
            // console.log(response);
        
            //     let userMovie = JSON.parse(body);

        // Title of the movie.
        console.log("Movie: " + response.data.Title);
        // Year the movie came out.
        console.log("Released: " + response.data.Released);
        // IMDB Rating of the movie.
        console.log("IMDB Rating: " + response.data.imdbRating);
        // Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        // Country where the movie was produced.
        console.log("Country: " + response.data.Country);
        // Language of the movie.
        console.log("Language: " + response.data.Language);
        // Plot of the movie.
        console.log("Plot: " + response.data.Plot);
        // Actors in the movie.
        console.log("Actors: " + response.data.Actors);
        
            },   
    
    function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
};

// node liri.js do-what-it-says
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data){
if (error) {
    return console.log(error);
}
let dataArr = data.split(",");

userInput = dataArr[0];
userQuery = dataArr[1];

userCommand(userInput, userQuery);
    });
};
function showCommands() {
    console.log("Available commands are: ");
    console.log("concert-this");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("do-what-it-says");
};


