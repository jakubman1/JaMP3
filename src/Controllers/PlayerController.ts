import {EventEmitter} from 'events';
const { ipcRenderer } = window.require('electron');

export const playerEmitter = new EventEmitter();

ipcRenderer.on('songControlToggle', () => {
    playerEmitter.emit('togglePlay', true);
});

ipcRenderer.on('songControlPrev', () => {
    playerEmitter.emit('prev', true);
});

ipcRenderer.on('songControlNext', () => {
    playerEmitter.emit('next', true);
});