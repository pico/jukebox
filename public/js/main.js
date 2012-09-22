Ext.application({
    name: "AirJukeBox",

    views: ["Start", "Response", "Question"],
    models: ["Song"],
    controllers:["Main"],
    stores:["Songs"],

    launch: function () {
    	var mainView = {
            xtype: "start",
            id:'start'
        };
        var responseView = {
            xtype: "response",
            id:'response'
        };
        var questionView = {
            xtype: "question",
            id:'question'
        };
        Ext.Viewport.add(mainView, questionView, responseView);

        console.log("App launch");
    }
});