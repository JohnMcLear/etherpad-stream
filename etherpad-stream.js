#!/usr/local/bin/node

/*
	Modify these
*/

var host = 'etherpad.example.com';
var port = 80;
var apiKey = '123';

/*
	No need to touch anything below here
*/

var api = require('etherpad-lite-client');

if (process.stdin.isTTY){
	process.stdin.setRawMode(true);
}

var stdin = require('readline').createInterface( process.stdin, {} ); 

var padID = process.argv[2] || null;

if (!padID){
	padID = require("os").hostname();
}

var etherpad = api.connect({
	apikey: apiKey,
	host: host,
	port: port
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

	process.stdout.write(text);	
	checkPadExists(padID, text);
});

console.log("---\nStreaming to http://" + etherpad.options.host + "/p/" + padID + "\n---\n");