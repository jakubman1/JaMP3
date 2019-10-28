const NodeID3 = require('node-id3');
const { ipcMain } = require('electron');
const db = require('./db');


ipcMain.on('importMP3s-request', (event, arg) => {
    processPaths(arg);
});

ipcMain.on('getSongsTable-request', (event, arg) => {
    db.findSongsInSelectedPlaylist(arg)
        .then(response => event.reply('getSongsTable-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('getAllPlaylists-request', (event, arg) => {
    db.findAllPlaylists()
        .then(response => event.reply('getAllPlaylists-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('createNewPlaylist-request', (event, arg) => {
    db.createNewPlaylist(arg.id, arg.name);
});

ipcMain.on('deletePlaylist-request', (event, arg) => {
    db.deletePlaylist(arg);
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