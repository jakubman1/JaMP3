import {EventEmitter} from 'events';

export const importFinished = new EventEmitter();


export function doneImporting() {
    importFinished.emit('importFinished', true);
}