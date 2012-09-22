Ext.define("AirJukeBox.controller.Main", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            mainContainer: "mainContainer"
        },
        control: {
            mainContainer: {
                // The commands fired by the notes list container.
                setSongCommand: "onSetSongCommand"
            }
        }
    },
    onSetSongCommand: function (list, record) {
        console.log("onSetSongCommand");

        this.socket.emit('change-song', record.data.uri, record.data.title);
    },
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        Ext.getStore("Songs").load();

        var socket = io.connect('/');

        socket.on('connect', function() {
            console.log('Connexion success');
        });

        socket.on('disconnect', function() {
            console.log('Disconnect');
        });

        socket.on('update-song', function (uri, name) {
            console.log('update-song : ' + name + ' | ' + uri);
        });

        this.socket = socket;

        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});