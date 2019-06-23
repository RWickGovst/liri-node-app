` Require .env file `
require("dotenv").config();

` Require request `
let request = require("request");

var moment = require("moment");

var fs = require("fs");

` Link to key page `
var keys = require("./keys.js");

` Initialize spotify `
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");

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
        default:
            console.log("Please enter a valid command");
            break;
    }
};
userCommand (userInput, userQuery);

function concertThis() {
    console.log("Getting the information you requested");

    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp"){
        if (!error && Response.statusCode === 200){
            let userBand = JSON.parse(body);

            if (userBand.length > 0){
                for (var i=0; i < 1; i++){
                    console.log("Artist: ")

                let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log("Date and Time: " + $(concertDate));
                };
            } 
            else {
                console.log("Information not found");
            };
        };
    };
};
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

    for (var i=0; i < spotifyArr.length; i++){
        console.log("Artist: ")
    };
});

}
function movieThis(){
    console.log("Getting the information you requested");
    if (!userQuery){userQuery = "mr nobody";
                };
            var axios = require("axios");
            axios.get("http://www.omdbapi.com/?t=" + userQuery + "&apikey=1d86f0e6").then(function(response){
        
            let userMovie = JSON.parse(body);
console.log(userMovie);
        let ratingsArr = userMovie.userMovie.Ratings;
        if (ratingsArr.length > 2){

        }
        if (!error && response.statusCode === 200){
            console.log("Movie: $(userMovie.Title");
        }
            else{
                console.log("Information not found");
            };
    });
};

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
`node liri.js concert-this <artist/band name here>`
`node liri.js spotify-this-song '<song name here>'`
`node liri.js movie-this '<movie name here>'`
