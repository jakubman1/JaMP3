const {app, BrowserWindow,  globalShortcut} = require('electron');
const path = require('path');
require('./Models/db');
require('./Models/dbHandler');

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true
        },
        title: "JaMP3 | Loading...",

    });

    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', () => {
    createWindow();
    const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
    });
    if (!ret) {
        console.log('registration failed')
    }
});
