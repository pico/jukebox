Ext.define("AirJukeBox.view.SongList", {
    extend: "Ext.dataview.List",
    alias: "widget.songlist",
    config: {
        loadingText: "Loading ...",
        emptyText: '</pre><div class="notes-list-empty-text">Playlist empty</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{title}</div><pre>'
    }
});
