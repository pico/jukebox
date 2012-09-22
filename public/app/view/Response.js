Ext.define("AirJukeBox.view.Response", {
    extend: "Ext.Container",
    alias: "widget.response",

     initialize: function () {

        this.callParent(arguments);

        var topToolbar = {
            xtype: "toolbar",
            title: 'AirBox',
            docked: "top"
        };

        var good = {
            xtype: "label",
            html : 'GOOD',
            id: 'goodLabel',
            hidden:true
        };

        var bad = {
            xtype: "label",
            html : 'BAD',
            id: 'badLabel',
            hidden:true
        };

        this.add([topToolbar, good, bad]);
    }
});
