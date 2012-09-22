Ext.define("AirJukeBox.controller.Main", {
    extend: "Ext.app.Controller",
    requires: [ 'Ext.MessageBox', 'Ext.Anim'],
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            goButton: "start button",
            labelStatus : "start #labelConnexion",
            nameField: "start #pseudo",
            questionView: "question",
            responseView: "response",
            responseField : "question #response",
            goodResponse: "response #goodLabel",
            badResponse: "response #badLabel",
            tryAgain: "question #tryAgain",
            responseButton: "question #responseButton"
        },
        control: {
            goButton: {
                buttonGoClick: "onButtonGoClick"
            },
            responseButton: {
                newResponse: "onNewResponse"
            }
        },
        slideLeftTransition: {
            type: 'slide',
            direction: 'left'
        },
        playerName: '',
        lastResponseGood:false
    },
    onButtonGoClick: function () {
       // Check input value
       if(this.getNameField().getValue() === '') {
            Ext.Msg.alert("Enter a name");
       } else {
            this.socket.emit('add-player', this.getNameField().getValue());

            this.playerName = this.getNameField().getValue().toLowerCase();

            // Switch view
            Ext.Viewport.setActiveItem(1);
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

        var socket = io.connect('/');

        socket.on('connect', function() {
            console.log('Connexion success');

            this.connected = true;

            controller.getGoButton().show();
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

        socket.on('new-song', function () {
            if(controller.currentScreen == 'question') {
                // Stay on
                controller.getTryAgain().hide();
            } else {
                // Switch screen
                Ext.Viewport.setActiveItem(1);
                controller.getTryAgain().hide();
                //Ext.Viewport.animateActiveItem(controller.getQuestionView(), controller.slideLeftTransition);
            }
        });

        this.socket = socket;

        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});