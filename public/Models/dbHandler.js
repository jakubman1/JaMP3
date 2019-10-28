const NodeID3 = require('node-id3');
const { ipcMain } = require('electron');
const db = require('./db');


ipcMain.on('importMP3s-request', (event, arg) => {
    console.log(arg);
    processPaths(arg);
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
        playlist: ['all']
    };
    console.log(record);
    db.insertRecord(record);
}