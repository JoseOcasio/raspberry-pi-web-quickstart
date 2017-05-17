var http = require('http');
var fs = require('fs');

var express = require('express');
var app = express();

// Use python shell
var PythonShell = require('python-shell');

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

    PythonShell.run(pythonScript, function (err) {
      if (err) throw err;
        console.log(pythonScript + " has finished executing");
    });
}

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


