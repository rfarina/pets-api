var httpClient = require('request').defaults({
	json: true
});

var async = require('async');

module.exports = function(app) {

	/* ************************************************************ */
	/* Read */
	/* ************************************************************ */
	/* Read */
	app.get('/pets', function(req, res) {

		async.parallel({
			catdata: function(callback) {

				httpClient({uri: 'http://localhost:3000/cat'},
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
			},  // end cat
			dogdata: function(callback) {
				httpClient({uri: 'http://localhost:3001/dog'},
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

				httpClient({uri: 'http://localhost:3000/cat/' + req.params.id},
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
			catdata: function(callback) {

				httpClient({uri: 'http://localhost:3001/dog/' + req.params.id},
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
					uri: 'http://localhost:3000/cat/',
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
					uri: 'http://localhost:3001/dog/',
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
					uri: 'http://localhost:3000/cat/' + req.params.id,
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
					uri: 'http://localhost:3001/dog/' + req.params.id,
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
					uri: 'http://localhost:3000/cat/' + req.params.id,
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
					uri: 'http://localhost:3001/dog/' + req.params.id,
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

	}); // end get /cat/:id




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