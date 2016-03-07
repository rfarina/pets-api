var httpClient = require('request').defaults({
	json: true
});

var async = require('async');

var redis = require('redis');
redisClient = redis.createClient(6379, '127.0.0.1');

module.exports = function(app, config) {
	// console.log('config inside of pets.js: ',config);
	var catServerAddress = config.catServerAddress;
	var dogServerAddress = config.dogServerAddress;


	/* ************************************************************ */
	/* Read */
	/* ************************************************************ */
	/* Read */
	app.get('/pets', function(req, res) {

		async.parallel({
			catdata: function(callback) {
				
				// Check cache first
				redisClient.get('basickey', function(error, cat){
					if(error){throw error;};
					if(cat) {
						// use value from cache
						var jsonCat = JSON.parse(cat);
						jsonCat.info = 'this data came from cache';
						console.log('cacheCat:', jsonCat);
						callback(null, jsonCat);
						// callback(null, JSON.parse(cat));
					}else {
						// retrieve from database
						httpClient({uri: catServerAddress},
						function(error, response, body){
							
							if (error) {
								callback({
									service: 'cat', 
									error: error
								});
								return;
							}
							if (!error && response.statusCode === 200) {
								// res.json(body);
								body.info = 'this data came from db';
								console.log('body.info:', body.info);
								// callback(null, body);
								// Update cache
								// redisClient.set('basickey', 10, JSON.stringify(body),function(error){
								// 	if(error) {throw error;}
								// })
								setTimeout(function(){
									redisClient.setex('basickey', 10, JSON.stringify(body),function(error){
										if(error) {throw error;};
										callback(null, body);
									})
								},10000);

							} else {
								// res.json({
								// 	info: "An error occurred getting cats",
								// 	status: response.statusCode
								// })
								callback(response.statusCode);
							}
						
						}); // end httpClient call						

					}

				});





			},  // end cat
			dogdata: function(callback) {
				httpClient({uri: dogServerAddress},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'dog', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);

					} else {
						// res.json({
						// 	info: "An error occurred getting dogs",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end function
			} // end dog
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /pets

	/* ************************************************************ */
	/* Read One */
	/* ************************************************************ */
	/* Read One */
	app.get('/cat/:id', function(req, res) {

		async.parallel({
			catdata: function(callback) {

				httpClient({uri: catServerAddress + req.params.id},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'cat', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting cats",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id

	/* Read One */
	app.get('/dog/:id', function(req, res) {

		async.parallel({
			dogdata: function(callback) {

				httpClient({uri: dogServerAddress + req.params.id},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'dog', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting dog",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /dog/:id


	/* ************************************************************ */
	/* POSTS*/
	/* ************************************************************ */
	/* Post */
	app.post('/cat/', function(req, res) {

		async.parallel({
			catdata: function(callback) {

				httpClient({
					uri: catServerAddress,
					method: 'POST',
					json: req.body
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'cat', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting cats",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id

	app.post('/dog/', function(req, res) {

		async.parallel({
			dogdata: function(callback) {

				httpClient({
					uri: dogServerAddress,
					method: 'POST',
					json: req.body
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'dog', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting dogs",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id


	/* ************************************************************ */
	/* PUTS*/
	/* ************************************************************ */
	/* Put */
	app.put('/cat/:id', function(req, res) {

		async.parallel({
			catdata: function(callback) {
				httpClient({
					uri: catServerAddress + req.params.id,
					method: 'PUT',
					json: req.body
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'cat', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting cats",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id

	app.put('/dog/:id', function(req, res) {

		async.parallel({
			dogdata: function(callback) {
				httpClient({
					uri: dogServerAddress + req.params.id,
					method: 'PUT',
					json: req.body
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'dog', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting dogs",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id




	/* ************************************************************ */
	/* DELETES */
	/* ************************************************************ */
	/* Delete */
	app.delete('/cat/:id', function(req, res) {

		async.parallel({
			catdata: function(callback) {
				httpClient({
					uri: catServerAddress + req.params.id,
					method: 'DELETE'
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'cat', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting cats",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /cat/:id


	app.delete('/dog/:id', function(req, res) {

		async.parallel({
			dogdata: function(callback) {
				httpClient({
					uri: dogServerAddress + req.params.id,
					method: 'DELETE'
				},
				function(error, response, body){
					
					if (error) {
						callback({
							service: 'dog', 
							error: error
						});
						return;
					}
					if (!error && response.statusCode === 200) {
						// res.json(body);
						callback(null, body);
						// setTimeout(function(){
						// 	callback(null, body);
						// },10000);

					} else {
						// res.json({
						// 	info: "An error occurred getting dogs",
						// 	status: response.statusCode
						// })
						callback(response.statusCode);
					}
				
				}); // end httpClient call
			}
		},  // end second parm of async parallel
		function(error, results) {

			// // Create block via loop
			// for(var x=0; x<2000000; x++) {
			// 	console.log(x);
			// }

			// Return the results from the accumulated asysn calls
			res.json({
				error: error,
				results: results
			})
		}); // end async.parallel method call

	}); // end get /dog/:id




	/* ************************************************************ */
	/*	Ping  */
	/* ************************************************************ */
	/*
		Placed her to show that in conjunction with 'blocking', the '/ping'
		request will not be executed until the blocking loop completes
	*/
	// app.get('/ping', function(req, res){
	// 	res.json({date: Date.now()});
	// });

}; // end module