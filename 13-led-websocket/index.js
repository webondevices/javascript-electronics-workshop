var five = require('johnny-five');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var arduino = new five.Board();

arduino.on('ready', function () {

	var led = new five.Led(6);

    // Start listening on port 8080
	server.listen(8080, function () {
	    console.log('Express server listening on port 8080');
	});

	// Respond to web GET requests with index.html page
	app.get('/', function (request, response) {
	    response.sendFile(__dirname + '/public/index.html');
	});

	// Define route folder for static requests
	app.use(express.static(__dirname + '/public'));

	// Increment client counter if someone connects
	io.on('connection', function (socket) {

		// Set on message event listener for all sockets
		socket.on('led control', function (message) {
			led.brightness(message);
		});
	});
});
