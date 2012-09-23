var app = require('express').createServer();
var io = require('socket.io').listen(app);
var express = require('express');
var port = process.env.port || 8080;

app.listen(port);

app.configure(function() {
    app.set("view options", { layout: false, pretty: true });
    app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));
});

// routing
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.get('/app.json', function (req, res) {
	res.sendfile(__dirname + '/public/app.js');
});

var players = {};

io.sockets.on('connection', function (socket) {

	socket.on('add-player', function (name) {
		var lowerName = name.toLowerCase();
		if(typeof(players[lowerName]) == 'undefined') {
			// Add player
			players[lowerName] = {
				name:name,
				points:0
			};
		}
		socket.username = lowerName;
		io.sockets.emit('update-users', players);
		//socket.broadcast.emit('update-song', uri, name);
	});

	socket.on('new-response', function (playerName, response) {
		io.sockets.emit('response-given', playerName, response);
		//socket.broadcast.emit('update-song', uri, name);
	});

	socket.on('good-response-given', function (playerName) {
		if(typeof(players[playerName]) != 'undefined') {
			// Add player
			players[playerName].points++;
			io.sockets.emit('update-users', players);
		}
		io.sockets.emit('good-response', playerName ,players[playerName].name);
		//socket.broadcast.emit('update-song', uri, name);
	});

	socket.on('bad-response-given', function (playerName) {
		io.sockets.emit('bad-response', playerName);
		//socket.broadcast.emit('update-song', uri, name);
	});

	socket.on('change-song', function (name, uri) {
		io.sockets.emit('new-song', name, uri);
		//socket.broadcast.emit('update-song', uri, name);
	});

	socket.on('add-song', function (playerName, uri, name) {
		io.sockets.emit('add-song-playlist', playerName, uri, name);
		//socket.broadcast.emit('update-song', uri, name);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function() {
		delete players[socket.username];
		io.sockets.emit('update-users', players);
		//socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});