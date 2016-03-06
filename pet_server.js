var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Get config files so they can be passed into the routes
var fs = require('fs');
var configurationFile = 'config.json';

/* Include middleware*/
app.use(bodyParser.json()); // parse json if incoming
app.use(bodyParser.urlencoded({
	extended: true
}));

// Allow Access-Control-Allow-Origin
// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.all('*',function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});


// Get configuration file and pass it into the routes file along with app
var config = JSON.parse(fs.readFileSync(configurationFile, 'utf8'));
// var petRoutes = 
require('./routes/pets.js')(app, config);


var server = app.listen(3002, function() {
	console.log('pet server listing on 3002');
});