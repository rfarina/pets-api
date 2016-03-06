var _ = require('lodash');
var Dog = require('../models/dog.js');

module.exports = function(app) {


	/* Create */
	app.post('/dog', function(req, res){
		var newDog = new Dog(req.body);
		newDog.save(function(err, data){
			if(err){
				res.json({
					info: "error during dog create",
					error: err
				});
			} else {
				res.json({
					info: "dog created successfully",
					data: data
				});
			}
		});
	});

	/* Read all dogs*/
	app.get('/dog', function(req, res) {
		Dog.find(function(err, dogs){
			if(err){
				res.json({
					info: "error during find of dogs",
					error: err
				});
			} else {
				res.json({
					info: "dogs found successfully",
					data: dogs
				});
			}

		});
	});

	/* Read cat by id*/
	app.get('/dog/:id', function(req, res){
		Dog.findById(req.params.id, function(err, dog){
			if(err) {
				res.json({
					info: "Dog not found",
					error: err
				});
			} else {
				if(dog){
					res.json({
						info: "Dog found successfully",
						data: dog
					});
				} else {
					res.json({
						info: "Dog not found",
						DogId: req.params.id
					});
				}
			}
		});
	});


	/* Update Dog */
	app.put('/dog/:id', function(req, res){
		Dog.findById(req.params.id,function(err, dog){
			if(err) {
				res.json({
					info: "error on finding dog for update",
					error: err
				});
			} else if (dog){
				/*
					Merge the found Dog with the data coming in. 
					This will allow us to update just a single 
					field w/o having to send the entire object
					in the request.
				*/
				_.merge(dog, req.body);
				dog.save(function(err){
					if (err) {
						res.json({
							info: "Dog not updated",
							error: err
						});
					} else {
						res.json({
							info: "Dog updated successfully",
							data: dog
						});
					}
				});
			} else {
				res.json({
					info: "Dog to update not found",
					id: req.params.id
				});
			}
		});
	});

	/* Delete Dog */
	app.delete('/dog/:id', function(req, res){
		Dog.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({
					info: "Dog not deleted",
					error: err
				});
			}else {
				res.json({
					info: "Dog successfully deleted",
					deletedId: req.params.id
				});

			}
		});
	});


}; // end function(app)