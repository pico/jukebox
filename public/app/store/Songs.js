Ext.define("AirJukeBox.store.Songs", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "AirJukeBox.model.Song",
        data: [
            { title: "Batman", uri: "spotify:track:3PvvsoGjRyF7YhfQXZHUaX" },
            { title: "Gladiator", uri: "spotify:track:5vk7ZSiv1ncel3mBRUHW26" }
        ],
        sorters: [{ property: 'title', direction: 'DESC'}]
    }
});
