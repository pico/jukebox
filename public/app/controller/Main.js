Ext.define("AirJukeBox.controller.Main", {
    extend: "Ext.app.Controller",
    requires: [ 'Ext.MessageBox', 'Ext.Anim'],
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            goButton: "start #blindTestButton",
            jukeboxButton: "start #jukeboxButton",
            labelStatus : "start #labelConnexion",
            nameField: "start #pseudo",
            questionView: "question",
            responseView: "response",
            responseField : "question #response",
            goodResponse: "response #goodLabel",
            badResponse: "response #badLabel",
            tryAgain: "question #tryAgain",
            responseButton: "question #responseButton",
            searchList: "search",
            jukeboxView : "jukebox"
        },
        control: {
            goButton: {
                buttonGoClick: "onButtonGoClick"
            },
            jukeboxButton: {
                jukeboxClick: "onJukeboxClick"
            },
            responseButton: {
                newResponse: "onNewResponse"
            },
            searchList: {
                songSelect: "onSongSelect",
                backJukebox: "onBackJukeBox"
            },
            jukeboxView: {
                goSearchView: "onGoSearchView"
            }
        },
        slideLeftTransition: {
            type: 'slide',
            direction: 'left'
        },
        playerName: '',
        lastResponseGood:false,
        mode:''
    },
    onGoSearchView:function() {
        Ext.Viewport.setActiveItem(5);
    },
    onBackJukeBox:function() {
        Ext.Viewport.setActiveItem(4);
    },
    onJukeboxClick: function() {
        this.mode = 'jukebox';
        this.enter();
    },
    onButtonGoClick: function () {
        this.mode = 'blindtest';
        this.enter();
    },
    onSongSelect: function(list, record) {
        this.socket.emit('add-song', this.playerName ,record.data.uri, record.data.title);
        Ext.Viewport.setActiveItem(3);
    },
    enter: function() {
       // Check input value
       if(this.getNameField().getValue() === '') {
            Ext.Msg.alert("Enter a name");
       } else {
            this.socket.emit('add-player', this.getNameField().getValue());
            this.playerName = this.getNameField().getValue().toLowerCase();

            // Switch view
            if(this.mode == 'blindtest') {
                Ext.Viewport.setActiveItem(1);
            } else {
                Ext.Viewport.setActiveItem(3);
            }
           // Ext.Viewport.animateActiveItem(this.getQuestionView(), this.slideLeftTransition);
       }
    },
    onNewResponse: function() {
        this.socket.emit('new-response', this.playerName ,this.getResponseField().getValue());
    },
    // Base Class functions.
    launch: function () {
        var controller = this;
        this.connected = false;

        this.callParent(arguments);
        Ext.getStore("Songs").load();
        Ext.getStore("Playlist").load();

        var socket = io.connect('/');

        socket.on('connect', function() {
            console.log('Connexion success');

            this.connected = true;

            controller.getGoButton().show();
            controller.getJukeboxButton().show();
            controller.getLabelStatus().hide();
        });

        socket.on('disconnect', function() {

            this.connected = false;

            console.log('Disconnect');
        });

        socket.on('good-response', function (playerKey, name) {
            // Switch screen
            //Ext.Viewport.animateActiveItem(controller.getResponseView(), controller.slideLeftTransition);
            Ext.Viewport.setActiveItem(2);
            // Switch
            if(playerKey == controller.playerName) {
                // Display try again
                controller.getGoodResponse().show();
                controller.getBadResponse().hide();
            } else {
                controller.getBadResponse().setHtml('Pas assez rapide, ' + name + ' a gagné');
                controller.getBadResponse().show();
                controller.getGoodResponse().hide();
            }
        });

        socket.on('bad-response', function (playerName) {
            if(playerName == controller.playerName) {
                // Display try again
                controller.getTryAgain().show();

                Ext.Anim.run(controller.getTryAgain(), 'fade', {
                    out: true,
                    duration: 500,
                    delay:2000,
                    autoClear: false
                });
            }
        });

        socket.on('new-song', function (name, uri) {
            console.log('new-song : ' + name);

            var now = new Date();
            var id = (now.getTime()).toString() + (controller.getRandomInt(0, 100)).toString();
            var newSong = Ext.create("AirJukeBox.model.Song", {
                id:id,
                title:name,
                uri:uri
            });

            if(controller.mode == 'jukebox') {
                // Add song to the list
                var playlist = Ext.getStore("Playlist");

                playlist.add(newSong);
                playlist.sync();
            } else {
                if(controller.currentScreen == 'question') {
                    // Stay on
                    controller.getTryAgain().hide();
                } else {
                    // Switch screen
                    Ext.Viewport.setActiveItem(1);
                    controller.getTryAgain().hide();
                    //Ext.Viewport.animateActiveItem(controller.getQuestionView(), controller.slideLeftTransition);
                }
            }
        });

        this.socket = socket;

        console.log("launch");
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});