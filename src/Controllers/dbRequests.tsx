import React from "react";
const { ipcRenderer } = window.require('electron');

// synchronous-reply
// let tags = ipcRenderer.sendSync('insertMP3-request', path);
// asynchronous-reply
// ipcRenderer.send('asynchronous-message', 'ping')

export function importMP3s(files: string[]) {
    console.log("ahoj4");
    console.log(files);
    ipcRenderer.send('importMP3s-request', files);
}

export function getSongsTable(playlistID: string) {
    ipcRenderer.send('getSongsTable-request', playlistID);

    return new Promise<object[]>((resolve: any, reject: any) => {
        ipcRenderer.on('getSongsTable-reply', (event: any, arg: object[]) => {
            resolve(arg);
        });
    });
}

// importMP3s(['C:/Users/Akhady/Downloads/mp3/Modern Revolt - LOCA [NCS Release].mp3']);
// getSongsTable('all', () => {}, () => {});