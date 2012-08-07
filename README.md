# Etherpad-Stream

I wanted something that could take output from STDOUT and send it straight to
Etherpad. This is my implementation.

It works in TTY (as you type) mode, or you can redirect STDOUT to it.

## Examples

### TTY

```bash
node etherpad-stream.js mypad
```

This will open a TTY session with Etherpad, and everything you type will be 
sent to the `mypad` pad.

### Redirecting STDOUT

```bash
echo "Hello World" | node etherpad-stream.js mypad
```

```bash
ping google.co.uk | node etherpad-stream.js testpad
```

### No pad name

```bash
ping google.co.uk | node etherpad-stream.js
```

If you do not pass a pad name to etherpad-stream.js, your computer's hostname 
will be used as the pad name instead.

## Installation

First you'll need to clone this repo or download the files and unzip.

Open etherpad-stream.js and modify the settings:

```js
var host = 'etherpad.example.com';
var port = 80;
var apiKey = '123';
```

You can get your API key from your Etherpad server - have a look in APIKEY.txt

Then:

```bash
npm install
```

And you should be good to go.

## To Do

I can't figure out how to detect a backspace in TTY mode, so you can't delete
text. You'll have to use your browser for now.