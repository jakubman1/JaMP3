const { app } = require('electron');
const Datastore = require('nedb');

let db = new Datastore({filename: app.getPath('appData') + '/jamp3/jamp3.db', autoload: true});

module.exports = {
    insertRecord: function(record) {
        db.insert(record);
    }
};


/*export function insertRecord(record) {

}*/