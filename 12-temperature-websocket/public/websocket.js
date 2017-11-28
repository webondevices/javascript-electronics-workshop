function update(temperature) {

	// Update the front end the with value
	$('.celsius').html(parseInt(temperature) + '°C');
}

// Create the websocket connection
var socket = io.connect();

// When data is received, run the update function
socket.on('sensor reading', update);
