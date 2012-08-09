#!/usr/bin/env node

var api = require('etherpad-lite-client');

if (process.stdin.isTTY){
	process.stdin.setRawMode(true);
}

var stdin = require('readline').createInterface( process.stdin, {} ); 

var padID = process.argv[2] || null;

if (!padID){
	padID = require("os").hostname();
}

var etherpad;

var fs = require('fs');
fs.readFile(getUserHome() + '/.etherpad-stream', function(err,data){
	if (err) {
		console.error("Unable to read Etherpad settings. Have you put them in ~/.etherpad-stream ?");
		process.exit(1);
	} else {
		var settings = JSON.parse(data);
		etherpad = api.connect(settings);
		console.log("---\nStreaming to http://" + etherpad.options.host + ((etherpad.options.port == 80)? "" : ":" + etherpad.options.port) + "/p/" + padID + "\n---\n");
	}
});


var updatePad = function(pad, body){
	etherpad.getText({padID : pad}, function(error, data){
		
		// Etherpad always gives us an extra newline at the end of the current text. We don't want that.
		var oldText = data.text.substring(0,data.text.length - 1);
		var newText = oldText + body;
						
		etherpad.setText({padID : pad, text : newText}, function(error, data){
			if (error){
				console.log(error.message);
			}
		});
	});
}

var checkPadExists = function(pad, body){
	etherpad.createPad({
		padID : padID,
		text : ''
	}, function(error, data){
		if(error != null && error.code != 1){
			console.log(error.message);
		} else {
			updatePad(padID, body);
		}
			
	});
}

stdin.input.on('data', function (chunk) {
	if (chunk.toString() == '\3') {
		console.log('');
		process.exit();
	}
	var text = chunk.toString();

	if (text == '\r' || text == '\n'){
		console.log('');
	} else {
		process.stdout.write(text);	
	}
	checkPadExists(padID, text);
});

// From: http://stackoverflow.com/a/9081436
function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}