var five = require('johnny-five');
var player = require('play-sound')(opts = {})

var arduino = new five.Board();

arduino.on('ready', function () {
    
    // Access the motion sensor
    var motion = new five.IR.Motion(6);
    var led = new five.Led(4);
    var audio = null;

    // Event listeners with callback functions
    // Will capture button down event
    motion.on("motionstart", function() {
        led.blink(50);
        audio = player.play('alarm.mp3', function(){
            //
        });
    });

    motion.on("motionend", function() {
        led.stop().off();
        audio.kill();
    });
});