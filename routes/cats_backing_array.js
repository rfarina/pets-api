/* Note: Used for 'hard-wired' arrays as backing store */
/* See cat_routes.js for mongoose version with mongodb */
var _ = require('lodash');

module.exports = function(app) {

	_cats = [];
	_cats.push({
		name: "minnie",
		age: 5,
		type: "siamese"
	})

	/* Create */
	app.post('/cat', function(req, res){
		_cats.push(req.body);
		res.json({info: 'cat created successfully'});
	});

	/* Read all cats*/
	app.get('/cat', function(req, res) {
		res.json(_cats);
	});

	/* Read cat by id*/
	app.get('/cat/:id', function(req, res){
		res.send(
			_.find(_cats, {name: req.params.id})
		);
	});


	/* Update cat */
	app.put('/cat/:id', function(req, res){
		var index = _.findIndex(_cats, {name: req.params.id});
		_.merge(_cats[index], req.body);
		res.json({info: 'cat updated successfully'});
	});

	/* Delete cat */
	app.delete('/cat/:id', function(req, res){
		var index = _.findIndex(_cats, {name: req.params.id});
		/*	Perform forEach on each cat in _cats 
			if cat.name === id, then remove it */		
		_.remove(_cats, function(cat){
			return cat.name === req.params.id;
		});
		res.json({info: 'cat deleted successfully'});
	});



}; // end function(app)