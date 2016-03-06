var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	type: String,
	nickname: String
});

module.exports = mongoose.model('Cat', catSchema);
