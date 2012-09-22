/*
(function ($, jQuery, document, console) {
"use strict";

jQuery(document).ready(function(){
	var socket = io.connect('/');

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		console.log('Connexion success');

		$('[data-rel="status"]').html('Connecté');
	});

	socket.on('disconnect', function(){
		console.log('Disconnect');

		$('[data-rel="status"]').html('Disconnect');
	});

	// on change of song
	socket.on('update-song', function (uri, name) {
		console.log('update-song : ' + name + ' | ' + uri);

		$('[data-rel="current-song"]').html(name);
	});

	// when the client clicks SEND
	$('[data-rel="song"]').unbind('click').click( function() {
		var uri = $(this).attr('data-uri');
		var name = $(this).html();

		socket.emit('change-song', uri, name);
		console.log('Change song : ' + name);
	});
});
})($, jQuery, document, console);
*/

Ext.application({
    name: "AirJukeBox",

    views: ["SongList", "Main"],
    models: ["Song"],
    controllers:["Main"],
    stores:["Songs"],

    launch: function () {

    	var mainView = {
            xtype: "mainContainer"
        }; 
        Ext.Viewport.add(mainView);

        console.log("App launch");
    }
});