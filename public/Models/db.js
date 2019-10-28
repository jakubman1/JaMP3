const { app } = require('electron');
const Datastore = require('nedb');

let db = new Datastore({filename: app.getPath('appData') + '/jamp3/jamp3.db', autoload: true});

module.exports = {
    insertRecord: function(record) {
        db.insert(record);
    },

    findSongsInSelectedPlaylist: function(playlistID) {
        if (playlistID === 'all') {
            return new Promise((resolve, reject) => {
                db.find({}, function (err, docs) {
                    if (err) reject(err);
                    resolve(docs);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                db.find({ playlists: playlistID }, function (err, docs) {
                    if (err) reject(err);
                    if (!docs) resolve([]);
                    resolve(docs);
                });
            });
        }
    }
};