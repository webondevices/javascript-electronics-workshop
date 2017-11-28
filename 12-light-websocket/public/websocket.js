function update(value) {

	// Update the front end the with value
    $('.celsius').html(parseInt(value) + '%');
    
    // change background
    $('body').css('background-color', 'hsl(50, 100%, ' + value + '%)');
}

// Create the websocket connection
var socket = io.connect();

// When data is received, run the update function
socket.on('sensor reading', update);
