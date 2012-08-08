# Etherpad-Stream

[Video](http://www.youtube.com/watch?v=PScJLoNMdX4&)

I wanted something that could take output from STDOUT and send it straight to
Etherpad. This is my implementation.

It works in TTY (as you type) mode, or you can redirect STDOUT to it.

## Examples

### TTY

```bash
etherpad-stream mypad
```

This will open a TTY session with Etherpad, and everything you type will be 
sent to the `mypad` pad.

### Redirecting STDOUT

```bash
echo "Hello World" | etherpad-stream mypad
```

```bash
ping google.co.uk | etherpad-stream testpad
```

### No pad name

```bash
ping google.co.uk | etherpad-stream
```

If you do not pass a pad name to etherpad-stream.js, your computer's hostname 
will be used as the pad name instead.

## Installation

```bash
npm install -g etherpad-stream
```

Next, create `~/.etherpad-stream` and provide your Etherpad details:

```javascript
{
	"host" : "localhost",
	"port" : 9001,
	"apikey" : "1234ABCD"
}
```

You can get your API key from your Etherpad server - have a look in APIKEY.txt

Then you should be good to go.

## To Do

- I can't figure out how to detect a backspace in TTY mode, so you can't delete
text. You'll have to use your browser for now.
