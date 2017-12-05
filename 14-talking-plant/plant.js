var five = require('johnny-five');
var say = require('say');
var faces = require('./faces.js');
var util = require('./util.js');

var arduino = new five.Board();

var sensorData = {
    light: 0,
    soil: 0,
    temperature: 0
};

var interval = 0.3;
var lastSpoken = new Date();

function interpret(sensorData) {
    var message = '';
    var now = new Date();
    var currentHour = now.getHours();

    matrix.draw(faces.sad);
    
    if (sensorData.temperature < 18) {
        message += 'I\'m freezing! It\'s ' + sensorData.temperature + 'degrees in here. Turn on the heating or put me out to the sun?';
    
    } else if (sensorData.temperature > 30) {
        message += 'I\'m hot! It\'s ' + sensorData.temperature + 'degrees in here. Open the window or move me away from the sun.';
    }

    if (sensorData.light < 50 && currentHour < 20 && currentHour > 6) {
        message += 'It\'s too dark in here. Switch the lights on!';
    } 

    if (sensorData.soil < 5) {
        message += 'Water me please! My soil is dry.';
    }

    if (message === '') {
        message += 'I\'m happy right now! Everything is fine.';
        matrix.draw(faces.happy);
    }

    if (now.getTime() - lastSpoken.getTime() > interval * 1000 * 60) {
        say.speak(message);
        lastSpoken = now;
    }
}

arduino.on('ready', function () {
    
    // Sensor initilisation
    var lightSensor = new five.Sensor({
        pin: 'A1',
        freq: 1000
    });

    var soilSensor = new five.Sensor({
        pin: 'A2',
        freq: 1000
    });

    var thermometer = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 2000
    });

    
    // LED face initialisation
    matrix = new five.Led.Matrix({
        pins: {
            data: 2,
            clock: 3,
            cs: 4
        }
    });
    
    matrix.on();
    matrix.draw(faces.happy);

    // Sensor event listeners
    lightSensor.on('data', function () {
        sensorData.light = util.map(this.value, 0, 1024, 100, 0);
        interpret(sensorData);
    });

    soilSensor.on('data', function () {
        sensorData.soil = util.map(this.value, 0, 1024, 100, 0);
        interpret(sensorData);
    });

    thermometer.on('data', function () {
        sensorData.temperature = this.C;
        interpret(sensorData);
    });
});