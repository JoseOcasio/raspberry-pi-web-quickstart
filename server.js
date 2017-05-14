var http = require('http');
var fs = require('fs');

// Use python shell
var PythonShell = require('python-shell');

turnOnLed();

function turnOnLed (){
    executePythonShell('ledOn.py');
}

function turnOffLed (){
    executePythonShell('ledOff.py');

}

function blinkLed(){
    executePythonShell('blinkingLed.py');

}

function executePythonShell (pythonScript){
    var pyshell = new PythonShell(pythonScript);

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log(pythonScript + " has been executed");
    });
}

var express = require('express');
var app = express();


//api 
app.get('/', function (req, res) {
    res.sendfile('index.html', {root: __dirname });
})

app.get('/turnOffLed', function (req, res) {
    turnOffLed();
})

app.get('/turnOnLed', function (req, res) {
    turnOnLed();
})

app.get('/blinkLed', function (req, res) {
    blinkLed();
})

//end api


//load static files
app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})


