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
emitter.setMaxListeners(20);

export function searchSongsInPlaylist(playlistId: string, text: string) {
    ipcRenderer.send('searchSongsInPlaylist-request', {"playlistId": playlistId, "text": text});

    ipcRenderer.once('searchSongsInPlaylist-reply', (event: any, arg: object[]) => {
        console.log(arg);
        // emitter.emit('searchSongsInPlaylist', arg);
    });
}

export function importMP3s(files: string[]) {
    ipcRenderer.send('importMP3s-request', files);
}

export function importMP3sToNewPlaylist(playlistName: string, files: string[]) {
    ipcRenderer.send('importMP3sToNewPlaylist-request', {"playlistName": playlistName, "files": files});
}

export function importMP3sToPlaylist(playlistId: string, files: string[]) {
    ipcRenderer.send('importMP3sToPlaylist-request', {"playlistId": playlistId, "files": files});
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

export function addSongToFavourite(song_id: string) {
    ipcRenderer.send('addSongToFavourite-request', {'song_id': song_id});
}

export function removeSongToFavourite(song_id: string) {
    ipcRenderer.send('removeSongFromFavourite-request', {'song_id': song_id});
}

export function getSongsTable(playlistId: string) {
    ipcRenderer.send('getSongsTable-request', playlistId);

    ipcRenderer.once('getSongsTable-reply', (event: any, arg: object[]) => {
        emitter.emit('songsTableChanged', arg);
    });
}

export function getAllSongsCount() {
    ipcRenderer.send('getAllSongsCount-request');

    ipcRenderer.once('getAllSongsCount-reply', (event: any, arg: number) => {
        emitter.emit('allPlaylistCount', arg);
    });
}

export function getFavouriteSongsCount() {
    ipcRenderer.send('getFavouriteSongsCount-request');

    ipcRenderer.once('getFavouriteSongsCount-reply', (event: any, arg: number) => {
        emitter.emit('favouritePlaylistCount', arg);
    });
}

export function getAllPlaylists() {
    ipcRenderer.send('getAllPlaylists-request');

    ipcRenderer.once('getAllPlaylists-reply', (event: any, arg: object[]) => {
        emitter.emit('playlistListChanged', arg);
    });
}

export function getActualPlaylist(playlistId: string) {
    if (playlistId === "all") {
        const arg: object[] = [{_id: "all", name: "Všechny skladby"}];
        emitter.emit('getActualPlaylist', arg);
    }
    else if (playlistId === "favourite") {
        const arg: object[] = [{_id: "favourite", name: "Oblíbené skladby"}];
        emitter.emit('getActualPlaylist', arg);
    }
    else {
        ipcRenderer.send('getActualPlaylist-request', playlistId);

        ipcRenderer.once('getActualPlaylist-reply', (event: any, arg: object[]) => {
            emitter.emit('getActualPlaylist', arg);
        });
    }
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
// searchSongsInPlaylist("all", "ai");