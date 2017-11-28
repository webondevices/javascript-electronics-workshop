var five = require('johnny-five');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var arduino = new five.Board();

var numberOfClients = 0;

function sendData(sensorValue) {

    console.log(sensorValue);

	// Only send data when there are connected users
	if (numberOfClients > 0) {
		io.sockets.emit('sensor reading', sensorValue );
	}
}

arduino.on('ready', function () {

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
		numberOfClients++;

		// Decrement client counter if someone disconnects
		socket.on('disconnect', function () {
			numberOfClients--;
		});
	});
    
    // Access the light sensor on pin A0
    var lightSensor = new five.Sensor({
        pin: 'A0',
        freq: 50
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings

    lightSensor.on('data', function () {
        
        // Convert 0 - 1023 reading to percentage
        var percentage = parseInt(((1024 - this.value) / 1024) * 100);

        sendData(percentage);
    });
});
