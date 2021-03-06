var five = require('johnny-five');

var arduino = new five.Board();

var ledOn = false;

arduino.on('ready', function () {
    
    // Access the push button on pin D2
    var button = new five.Button(2);

    // Access the LED on pin D6
    var led = new five.Led(6);

    // Event listeners with callback functions
    // Will capture button down event
    button.on('down', function () {
        ledOn = !ledOn;
        
        if (ledOn) {
            // led.on();
            led.blink(50);
        } else {
            // led.off();
            led.stop().off();
        }
    });
});