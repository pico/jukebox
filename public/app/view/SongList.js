Ext.define("AirJukeBox.view.SongList", {
    extend: "Ext.dataview.List",
    alias: "widget.songlist",
    config: {
        loadingText: "Loading Songs ...",
        emptyText: '</pre><div class="notes-list-empty-text">No songs found.</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{title}</div><pre>'
    }
});
