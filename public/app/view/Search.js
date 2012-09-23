Ext.define("AirJukeBox.view.Search", {
    extend: "Ext.Container",
    alias: "widget.search",

    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype:'button',
            text:'Back',
            ui:'back',
            handler: this.onBackButton,
            scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            title: 'AirBox',
            docked: "top",
            items:[
                backButton,
                {xtype: 'spacer'}
            ]
        };

        var searchField = {
            xtype: 'searchfield',
            id:'searchfield',
            label:'Search'
        };

        var songList = {
            xtype: "songlist",
            store: Ext.getStore("Songs"),
            listeners: {
                disclose: { fn: this.onSongSelect, scope: this }
            }
        };

        this.add([
            topToolbar, 
            {
                xtype:'container',
                layout:'vbox', 
                items: [
                    searchField, 
                    songList
                ]
            }
            ]);
    },
    onSongSelect: function (list, record, target, index, evt, options) {
        console.log("song selected");
        this.fireEvent('songSelect', this, record);
    },
    onBackButton: function () {
        this.fireEvent('backJukebox', this);
    },
    config: {
        layout: {
            type: 'fit'
        }
    }
});
