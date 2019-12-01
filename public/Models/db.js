const { app } = require('electron');
const Datastore = require('nedb');

let songsDB = new Datastore({filename: app.getPath('appData') + '/jamp3/songs.db', autoload: true});
let playlistsDB = new Datastore({filename: app.getPath('appData') + '/jamp3/playlists.db', autoload: true});

module.exports = {
    // songsDB functions
    insertRecord: function(record) {
        songsDB.insert(record);
    },

    removeRecord: function(id) {
        songsDB.remove({ _id: id }, {});
        songsDB.persistence.compactDatafile();
    },

    addSongToPlaylist: function (song_id, pl_id) {
        songsDB.update({ _id: song_id }, { $addToSet: { playlists: pl_id } }, {});
        songsDB.persistence.compactDatafile();
    },

    removeSongFromPlaylist: function (song_id, pl_id) {
        songsDB.update({ _id: song_id }, { $pull: { playlists: pl_id } }, {});
        songsDB.persistence.compactDatafile();
    },

    findSongsInSelectedPlaylist: function(playlistID) {
        if (playlistID === 'all') {
            return new Promise((resolve, reject) => {
                songsDB.find({}, function (err, docs) {
                    if (err) reject(err);
                    resolve(docs);
                });
            });
        }
        else if (playlistID === 'favourite') {
            return new Promise((resolve, reject) => {
                songsDB.find({ favourite: true }, function (err, docs) {
                    if (err) reject(err);
                    if (!docs) resolve([]);
                    resolve(docs);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                songsDB.find({ playlists: playlistID }, function (err, docs) {
                    if (err) reject(err);
                    if (!docs) resolve([]);
                    resolve(docs);
                });
            });
        }
    },

    countAllSongs: function() {
        return new Promise((resolve, reject) => {
            songsDB.count({}, function (err, count) {
                resolve(count);
            });
        });
    },

    countFavouriteSongs: function() {
        return new Promise((resolve, reject) => {
            songsDB.count({ favourite: true }, function (err, count) {
                resolve(count);
            });
        });
    },

    // playlistsDB functions
    findAllPlaylists: function() {

        return new Promise((resolve, reject) => {
            playlistsDB.find({}, function (err, docs) {
                if (err) reject(err);
                if (!docs) resolve([]);
                resolve(docs);
            });
        });
    },

    createNewPlaylist: function (name) {
        playlistsDB.insert({name: name});
    },

    deletePlaylist: function (id) {
        playlistsDB.remove({ _id: id }, {});
        playlistsDB.persistence.compactDatafile();
    },

    renamePlaylist: function (pl_id, name) {
        playlistsDB.update({ _id: pl_id }, { name: name }, {});
        playlistsDB.persistence.compactDatafile();
    },
};