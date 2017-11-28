var five = require('johnny-five');

var arduino = new five.Board();

function map(input, in_min, in_max, out_min, out_max) {
    return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function limit(input, min, max) {
    var output = input;
    if (input < min) output = min;
    if (input > max) output = max;
    return output;
}

arduino.on('ready', function () {
    
    // Access the light sensor on pin A0
    var lightSensor = new five.Sensor({
        pin: 'A0',
        freq: 50
    });

    var led = new five.Led(6);

    // Data event listener with callback function
    // Will capture incoming sensor readings
    lightSensor.on('data', function () {
        var level = map(this.value, 0, 1024, 0, 255);

        level = limit(level, 0, 255);

        console.log(this.value + ' -> ' + level);
        
        led.brightness(level);
    });
});