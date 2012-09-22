Ext.define("AirJukeBox.view.Start", {
    extend: "Ext.Container",
    alias: "widget.start",

     initialize: function () {

        this.callParent(arguments);

        var topToolbar = {
            xtype: "toolbar",
            title: 'AirBox',
            docked: "top"
        };

        var inputName = {
            xtype: "textfield",
            label: 'Pseudo',
            id: 'pseudo',
            required: true

        };

        var labelStatus = {
            xtype: "label",
            html : 'Connecting ...',
            name: 'labelStatus',
            id: 'labelConnexion'
        };

        var button = {
            xtype: "button",
            text: "GO",
            handler: this.onButtonPress,
            name: 'goButton',
            hidden:true
        };

        this.add([
            topToolbar,
            {
                xtype: 'container',
                layout: 'vbox',
                items:[
                    {
                        xtype:"fieldset", 
                        padding: 20, 
                        margin:5,
                        items: [inputName,labelStatus,button]
                    }
                    
                ]
            }
            ]);
    },

    onButtonPress:function() {
        console.log('on button press go');

        this.fireEvent('buttonGoClick', this);
    }
});
