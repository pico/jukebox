Ext.define("AirJukeBox.view.Main", {
    extend: "Ext.Container",
    alias: "widget.mainContainer",

     initialize: function () {

        this.callParent(arguments);

        var topToolbar = {
            xtype: "toolbar",
            title: 'AirBox',
            docked: "top"
        };

        var songList = {
            xtype: "songlist",
            store: Ext.getStore("Songs"),
            listeners: {
                disclose: { fn: this.onSongListDisclose, scope: this }
            }
        };

        this.add([topToolbar, songList]);
    },
    
    config: {
        layout: {
            type: 'fit'
        }
    },

    onSongListDisclose: function (list, record, target, index, evt, options) {
        console.log("onSongListDisclose");
        this.fireEvent('setSongCommand', this, record);
    }

});
