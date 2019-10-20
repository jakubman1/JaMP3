const {app, BrowserWindow} = require('electron');
const path = require('path');
require('./Models/db');
require('./Models/dbHandler');

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
