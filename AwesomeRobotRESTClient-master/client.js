var querystring = require('querystring');
var request = require('request');


const AUTHENTICATION_FAILED_NO_USER_FOUND = 0;
const AUTHENTICATION_FAILED_WRONG_PASSWORD = 1;
const TOKEN_FAILED_TO_AUTHENTICATE = 2;
const TOKEN_NOT_PROVIDED = 3;
const NOT_AUTHORISED = 4;


// fill this in!
var _token;
const _teamName = "TeamBartje";
const _robotName = "RobotBartje";
const _pwd = "bartjevliegt!"

// General approach
//  1. access API
//    - if no token || denied -> /api/authenticate



/* DEFINE METHODS TO GET/POST DATA */
function postSpeed(speed) {
	console.log("Trying to post speed");
	if (_token) {
		var time = Date.now(); // UNIX timestamp

		var body = {
			speed: speed,
			name: _robotName,
			time: time,
			token: _token
		}

		console.log(body);

		request.post({
			url: "https://awesome-robot-project.herokuapp.com/api/robot/speed",
			body: body,
			json: true
		}, function(error, response, body) {
			if (body.success) {
				console.log("Success!")
			} else {
				if (body.code == TOKEN_FAILED_TO_AUTHENTICATE) {
					authenticate(function(res) {
						_token = res.token;
						console.log("This is our new token to access the API: " + _token);
						postSpeed(speed);
					});
				}
			}
		});
	} else {
		console.log("There is no token");
		authenticate(function(res) {
			_token = res.token;
			console.log("This is our new token to access the API: " + _token);
			postSpeed(speed);
		});
	}
}


function getRobot() {
	// /api/robot?token&name
	console.log("Trying to get robot state...");
	if (_token) {

		request.get({
			url: 'https://awesome-robot-project.herokuapp.com/api/robot?token=' + _token + '&name=' + _robotName,
			json: true
		}, function(error, response, body) {
			if (body.success) {
				console.log("Success!")
			} else {
				if (body.code == TOKEN_FAILED_TO_AUTHENTICATE) {
					authenticate(function(res) {
						_token = res.token;
						console.log("This is our new token to access the API: " + _token);
						postSpeed(speed);
					});
				}
			}
		});
	} else {
		console.log("There is no token");
		authenticate(function(res) {
			_token = res.token;
			console.log("This is our new token to access the API: " + _token);
			getRobot();
		});
	}
}


function authenticate(callback) {
	console.log("authenticating...");

	request.post({
		url: 'https://awesome-robot-project.herokuapp.com/api/authenticate',
		form: {
			name: _teamName,
			password: _pwd
		}
	}, function(err, httpResponse, body) {
		console.log(body);
		var body = JSON.parse(body);
		callback({
			success: body.success,
			token: body.token
		}); // return true -> success or false -> no success 
	});

};


/* CALL THE REQUIRED FUNCTIONS */
getRobot();
//postSpeed(10);