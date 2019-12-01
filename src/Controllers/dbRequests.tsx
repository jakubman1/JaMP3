import React from "react";
import {create} from "domain";
///<reference path="./typings/node/node.d.ts" />
import {EventEmitter} from 'events';
const { ipcRenderer } = window.require('electron');

// synchronous-reply
// let tags = ipcRenderer.sendSync('insertMP3-request', path);
// asynchronous-reply
// ipcRenderer.send('asynchronous-message', 'ping')

export const emitter = new EventEmitter();

export function importMP3s(files: string[]) {
    ipcRenderer.send('importMP3s-request', files);
}

export function removeMP3s(id: string) {
    ipcRenderer.send('removeMP3s-request', id);
}

export function addSongToPlaylist(song_id: string, pl_id: string) {
    ipcRenderer.send('addSongToPlaylist-request', {'song_id': song_id, 'pl_id': pl_id});
}

export function removeSongFromPlaylist(song_id: string, pl_id: string) {
    ipcRenderer.send('removeSongFromPlaylist-request', {'song_id': song_id, 'pl_id': pl_id});
}

export function getSongsTable(playlistID: string) {
    ipcRenderer.send('getSongsTable-request', playlistID);

    return new Promise<object[]>((resolve: any, reject: any) => {
        ipcRenderer.on('getSongsTable-reply', (event: any, arg: object[]) => {
            resolve(arg);
        });
    });
}

export function getAllSongsCount() {
    ipcRenderer.send('getAllSongsCount-request');

    ipcRenderer.on('getAllSongsCount-reply', (event: any, arg: number) => {
        emitter.emit('allPlaylistCount', arg);
    });
}

export function getFavouriteSongsCount() {
    ipcRenderer.send('getFavouriteSongsCount-request');

    ipcRenderer.on('getFavouriteSongsCount-reply', (event: any, arg: number) => {
        emitter.emit('favouritePlaylistCount', arg);
    });
}

export function getAllPlaylists() {
    ipcRenderer.send('getAllPlaylists-request');

    ipcRenderer.on('getAllPlaylists-reply', (event: any, arg: object[]) => {
        emitter.emit('playlistListChanged', arg);
    });
}

export function createNewPlaylist(name: string) {
    ipcRenderer.send('createNewPlaylist-request', {'name': name});
}

export function deletePlaylist(id: string) {
    ipcRenderer.send('deletePlaylist-request', {'id': id});
}

export function renamePlaylist(pl_id: string, name: string) {
    ipcRenderer.send('renamePlaylist-request', {'pl_id': pl_id, 'name': name});
}

// importMP3s(['C:/Users/Akhady/Downloads/mp3/Modern Revolt - LOCA [NCS Release].mp3']);
// importMP3s(['C:/Users/Akhady/Downloads/mp3/Modern Revolt - LOCA [NCS Release].mp3']);
// importMP3s(['C:/Users/Akhady/Downloads/mp3/Modern Revolt - LOCA [NCS Release].mp3']);
// getSongsTable('all', () => {}, () => {});
// createNewPlaylist('2', 'adamuvVelkyPlaylist');
// deletePlaylist('1ktlUOVf3LFxFlbm');
// getAllPlaylists();
// addSongToPlaylist('zfi8VXXsWRcIehww', '1');
// removeSongFromPlaylist('zF0WDDhuPPinzKqI', '1');
// renamePlaylist('1', "ahoj");
// removeMP3s('zF0WDDhuPPinzKqI');