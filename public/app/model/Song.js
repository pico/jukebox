Ext.define("AirJukeBox.model.Song", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'uri', type: 'string' }
        ]
    }
});
