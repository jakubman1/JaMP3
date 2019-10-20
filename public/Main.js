const {app, BrowserWindow} = require('electron');
const path = require('path');
const Datastore = require('nedb');

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', createWindow);
let collectionsDb = new Datastore({filename: app.getPath('appData') + '/jamp3/jamp3.db', autoload: true});

const globalAny = global;

globalAny.db = collectionsDb;
