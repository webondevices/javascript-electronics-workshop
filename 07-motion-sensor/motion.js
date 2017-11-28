var five = require('johnny-five');

var arduino = new five.Board();

arduino.on('ready', function () {
    
    // Access the motion sensor
    var motion = new five.Motion(2);

    // Event listeners with callback functions
    // Will capture button down event
    motion.on("motionstart", function() {
        console.log("motionstart", Date.now());
    });

    motion.on("motionend", function() {
        console.log("motionend", Date.now());
    });
});