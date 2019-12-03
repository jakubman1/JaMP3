const NodeID3 = require('node-id3');
const { ipcMain } = require('electron');
const db = require('./db');
const fs = require('fs');

ipcMain.on('getPlaylistsWithThisSong-request', (event, arg) => {
    db.getPlaylistsWithThisSong(arg)
        .then(response => event.reply('getPlaylistsWithThisSong-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('searchSongsInPlaylist-request', (event, arg) => {
    db.searchSongsInPlaylist(arg.playlistId, arg.text)
        .then(response => event.reply('searchSongsInPlaylist-reply', response))
        .catch(err => console.log(err));
});

ipcMain.on('importMP3s-request', (event, arg) => {
    processPaths("", arg);
});

ipcMain.on('importMP3sToNewPlaylist-request', (event, arg) => {
    db.createNewPlaylist(arg.playlistName)
        .then(response => processPaths(response._id, arg.files) )
        .catch(err => console.log(err));
});

ipcMain.on('importMP3sToPlaylist-request', (event, arg) => {
    processPaths(arg.playlistId, arg.files);
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

ipcMain.on('getPlaylistSongsCount-request', (event, arg) => {
    db.findAllPlaylists()
        .then(response1 => {
            for (let i = 0; i < response1.length; i++) {
                db.getPlaylistSongsCount(response1[i]._id)
                    .then(response2 => {
                        event.reply('getPlaylistSongsCount-reply', {_id: response1[i]._id, count: response2})
                    })
                    .catch(err => console.log(err));
            }
        })
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

function processPaths(playlistId, files) {
    for( let i = 0; i < files.length; i++)
    {
        if (files[i].toLowerCase().substr(-4) === '.mp3') {
            insertMP3(playlistId, files[i]);
        }
        else {
            // call open folder
            handleFolderImport(files[i], playlistId)
        }
    }
}

function handleFolderImport(folderPath, playlistId) {
    fs.readdir(folderPath, (err, dir) => {
        if(err === null) {
            for (let path of dir) {
                if(folderPath.substr(-1) !== '\\') {
                    folderPath += '\\';
                }
                if (path.toLowerCase().substr(-4) === '.mp3') {
                    insertMP3(playlistId, folderPath + path);
                }
                else {
                    handleFolderImport(folderPath + path, playlistId);
                }
            }
        }
    });
}

function insertMP3(playlistId, path) {
    let tags = NodeID3.read(path);
    let record;
    if(tags['title'] === undefined) {
        let pathArr = path.split('\\');
        record = {
            path: path,
            author: tags['artist'],
            title: pathArr[pathArr.length - 1].substr(0, pathArr[pathArr.length - 1].length - 4),
            album: tags['album'],
            year: tags['year'],
            favourite: false,
            playlists: (playlistId === "") ? [] : [playlistId]
        };
    }
    else {
        record = {
            path: path,
            author: tags['artist'],
            title: tags['title'],
            album: tags['album'],
            year: tags['year'],
            favourite: false,
            playlists: (playlistId === "") ? [] : [playlistId]
        };
    }
    db.insertRecord(record);
}