import React from "react";
import {create} from "domain";
const { ipcRenderer } = window.require('electron');

// synchronous-reply
// let tags = ipcRenderer.sendSync('insertMP3-request', path);
// asynchronous-reply
// ipcRenderer.send('asynchronous-message', 'ping')

export function importMP3s(files: string[]) {
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

export function getAllPlaylists() {
    ipcRenderer.send('getSongsTable-request');

    return new Promise<object[]>((resolve: any, reject: any) => {
        ipcRenderer.on('getAllPlaylists-reply', (event: any, arg: object[]) => {
            resolve(arg);
        });
    });
}

export function createNewPlaylist(id: string, name: string) {
    ipcRenderer.send('createNewPlaylist-request', {'id': id, 'name': name});
}

export function deletePlaylist(id: string) {
    ipcRenderer.send('deletePlaylist-request', id);
}

// importMP3s(['C:/Users/Akhady/Downloads/mp3/Modern Revolt - LOCA [NCS Release].mp3']);
// getSongsTable('all', () => {}, () => {});
// createNewPlaylist('1', 'adamuvVelkyPlaylist');
// deletePlaylist('1');