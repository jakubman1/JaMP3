const { app } = require('electron');
const Datastore = require('nedb');

let songsDB = new Datastore({filename: app.getPath('appData') + '/jamp3/songs.db', autoload: true});
let playlistsDB = new Datastore({filename: app.getPath('appData') + '/jamp3/playlists.db', autoload: true});

module.exports = {
    // songsDB functions
    insertRecord: function(record) {
        songsDB.insert(record);
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

    // playlistsDB functions
    findAllPlaylists: function() {

        return new Promise((resolve, reject) => {
            playlistsDB.find({}, function (err, docs) {
                if (err) reject(err);
                if (!docs) resolve([]);
                resolve(docs);
            });
        });
    }
};