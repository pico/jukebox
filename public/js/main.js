Ext.application({
    name: "AirJukeBox",

    views: ["SongList","Start", "Response", "Question", "Jukebox", "Search"],
    models: ["Song"],
    controllers:["Main"],
    stores:["Songs", "Playlist"],

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
        var jukeboxView = {
            xtype: "jukebox",
            id:'jukebox'
        };
        var searchView = {
            xtype: "search",
            id:'search'
        };
        Ext.Viewport.add(mainView, questionView, responseView, jukeboxView, searchView);

        console.log("App launch");
    }
});