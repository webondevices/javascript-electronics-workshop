var five = require('johnny-five');
var exec = require('child_process').exec;

var arduino = new five.Board();

arduino.on('ready', function () {
    
    // Access the push button on pin D2
    var button = new five.Button(2);

    // Event listeners with callback functions
    // Will capture button down event
    button.on('down', function () {
        exec('osascript -e \'tell application "Finder" to sleep\'');
    });
});