const NodeID3 = require('node-id3');
const { ipcMain } = require('electron');
const db = require('./db');


ipcMain.on('importMP3s-request', (event, arg) => {
    processPaths(arg);
});

ipcMain.on('removeMP3s-request', (event, arg) => {
    db.removeRecord(arg);
});

ipcMain.on('addSongToPlaylist-request', (event, arg) => {
    db.addSongToPlaylist(arg.song_id, arg.pl_id);
});

ipcMain.on('removeSongFromPlaylist-request', (event, arg) => {
    db.removeSongFromPlaylist(arg.song_id, arg.pl_id);
});

ipcMain.on('addSongToFavourite-request', (event, arg) => {
    db.addSongToFavourite(arg.song_id);
});

ipcMain.on('removeSongFromFavourite-request', (event, arg) => {
    db.removeSongFromFavourite(arg.song_id);
});

ipcMain.on('getSongsTable-request', (event, arg) => {
    db.findSongsInSelectedPlaylist(arg)
        .then(response => event.reply('getSongsTable-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('getAllSongsCount-request', (event, arg) => {
    db.countAllSongs()
        .then(response => event.reply('getAllSongsCount-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('getFavouriteSongsCount-request', (event, arg) => {
    db.countFavouriteSongs()
        .then(response => event.reply('getFavouriteSongsCount-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('getAllPlaylists-request', (event, arg) => {
    db.findAllPlaylists()
        .then(response => event.reply('getAllPlaylists-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('getActualPlaylist-request', (event, arg) => {
    db.getActualPlaylist(arg)
        .then(response => event.reply('getActualPlaylist-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('createNewPlaylist-request', (event, arg) => {
    db.createNewPlaylist(arg.name);
});

ipcMain.on('deletePlaylist-request', (event, arg) => {
    db.deletePlaylist(arg.id);
});

ipcMain.on('renamePlaylist-request', (event, arg) => {
    db.renamePlaylist(arg.pl_id, arg.name);
});

function processPaths(files) {
    for( let i = 0; i < files.length; i++)
    {
        if (files[i].substr(-4) === '.mp3') {
            insertMP3(files[i]);
        }
        else {
            // call open folder
        }
    }
}

function insertMP3(path) {
    let tags = NodeID3.read(path);
    let record = {
        path: path,
        author: tags['artist'],
        title: tags['title'],
        album: tags['album'],
        year: tags['year'],
        favourite: false,
        playlists: []
    };
    db.insertRecord(record);
}