const {app, BrowserWindow, globalShortcut,ipcMain} = require('electron');
const path = require('path');
require('./Models/db');
require('./Models/dbHandler');
const fs = require('fs');


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

    loadConfig(win);

    ipcMain.on('shortcutSetKeys', (event, arg) => {
        setConfig(win, arg.togglePause, arg.prev, arg.skip)
    });

});


function loadConfig(win) {
    try {
        let data = fs.readFileSync(path.join(app.getPath("appData"), "jamp3/keyConfig.json"));
        if (data !== undefined) {
            let keyConfig = JSON.parse(data);

           globalShortcut.register(keyConfig.TogglePause, () => {
                win.webContents.send('songControlToggle', true)
            });
            globalShortcut.register(keyConfig.Prev, () => {
                win.webContents.send('songControlPrev', true)
            });
            globalShortcut.register(keyConfig.Skip, () => {
                win.webContents.send('songControlNext', true)
            });
        } else {
            setConfig(win, "Alt+F6", "Alt+F5", "Alt+F7");
        }
    }
    catch(err) {
        console.log(err.message);
        setConfig(win, "Alt+F6", "Alt+F5", "Alt+F7");
    }

}

function setConfig(win, toggleKey, prevKey, nextKey) {


    globalShortcut.unregisterAll();

    globalShortcut.register(toggleKey, () => {
        win.webContents.send('songControlToggle', true)
    });
    globalShortcut.register(prevKey, () => {
        win.webContents.send('songControlPrev', true)
    });
    globalShortcut.register(nextKey, () => {
        win.webContents.send('songControlNext', true)
    });

    let data = {
        'Prev': prevKey,
        'TogglePause': toggleKey,
        'Skip': nextKey
    };
    fs.writeFile(path.join(app.getPath("appData"), "jamp3/keyConfig.json"), JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}