const { app } = require('electron');
const Datastore = require('nedb');

let db = new Datastore({filename: app.getPath('appData') + '/jamp3/jamp3.db', autoload: true});

module.exports = {
    insertRecord: function(record) {
        db.insert(record);
    },

    findSongsInSelectedPlaylist: function(playlistID) {
        if (playlistID === 'all') {
            db.find({}, function (err, docs) {
                return docs;
            });
        }
        else {
            return db.find({playlists: playlistID});
        }
    }
};