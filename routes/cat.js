var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function(app) {


	/* Create */
	app.post('/cat', function(req, res){
		var newCat = new Cat(req.body);
		newCat.save(function(err, data){
			if(err){
				res.json({
					info: "error during cat create",
					error: err
				});
			} else {
				res.json({
					info: "cat created successfully",
					data: data
				});
			}
		});
	});

	/* Read all cats*/
	app.get('/cat', function(req, res) {
		Cat.find(function(err, cats){
			if(err){
				res.json({
					info: "error during find of cats",
					error: err
				});
			} else {
				res.json({
					info: "cats found successfully",
					data: cats
				});
			}
		});
	});

	/* Read cat by id*/
	app.get('/cat/:id', function(req, res){
		Cat.findById(req.params.id, function(err, cat){
			if(err) {
				res.json({
					info: "cat not found",
					error: err
				});
			} else {
				if(cat){
					res.json({
						info: "cat found successfully",
						data: cat
					});
				} else {
					res.json({
						info: "cat not found",
						catId: req.params.id
					});
				}
			}
		});
	});


	/* Update cat */
	app.put('/cat/:id', function(req, res){
		Cat.findById(req.params.id,function(err, cat){
			if(err) {
				res.json({
					info: "error on finding cat for update",
					error: err
				});
			} else if (cat){
				/*
					Merge the found cat with the data coming in. 
					This will allow us to update just a single 
					field w/o having to send the entire object
					in the request.
				*/
				_.merge(cat, req.body);
				cat.save(function(err){
					if (err) {
						res.json({
							info: "cat not updated",
							error: err
						});
					} else {
						res.json({
							info: "cat updated successfully",
							data: cat
						});
					}
				});
			} else {
				res.json({
					info: "cat to update not found",
					id: req.params.id
				});
			}
		});
	});

	/* Delete cat */
	app.delete('/cat/:id', function(req, res){
		Cat.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({
					info: "cat not deleted",
					error: err
				});
			}else {
				res.json({
					info: "cat successfully deleted",
					deletedId: req.params.id
				});

			}
		});
	});


}; // end function(app)