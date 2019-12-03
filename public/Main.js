const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');
require('./Models/db');
require('./Models/dbHandler');

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true
        },
        title: "JaMP3 | Loading...",

    });

    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

    globalShortcut.register('Alt+F6', () => {
        win.webContents.send('songControlToggle', true)
    });
    globalShortcut.register('Alt+F5', () => {
        win.webContents.send('songControlPrev', true)
    });
    globalShortcut.register('Alt+F7', () => {
        win.webContents.send('songControlNext', true)
    });

});
