var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cats');

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


/* Require other modules */
// get the cats function and invoke it passing in app

/* Array version with lodash*/
// var cats = require('./cats.js')(app);

/* mongodb version with permanent backing store */
var petRoutes = require('./routes/pets.js')(app);


var server = app.listen(3002, function() {
	console.log('pet server listing on 3002');
});