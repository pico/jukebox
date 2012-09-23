Ext.define("AirJukeBox.store.Playlist", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "AirJukeBox.model.Song",
        data: []
    }
});
