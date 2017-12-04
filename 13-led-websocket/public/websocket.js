// Create the websocket connection
var socket = io.connect();

$(function () {
    $('#led-slider').on('input', function (event) {
        socket.emit('led control', event.currentTarget.value);
    });
});
