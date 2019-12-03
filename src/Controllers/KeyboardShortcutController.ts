import {emitter} from "./dbRequests";

const { ipcRenderer } = window.require('electron');

export function setShortcuts(togglePause: string, prev: string, skip: string) {
    ipcRenderer.send("shortcutSetKeys", {togglePause, prev, skip});
}

export function getShortcuts() {
    ipcRenderer.send('shortcutGetKeys', true);

    return new Promise<{TogglePause: string, Prev: string, Skip: string}>( (resolve, reject) =>
        ipcRenderer.on('shortcutGetKeys-reply', (event: any, arg: {TogglePause: string, Prev: string, Skip: string}) => {
            resolve(arg);
        })
    )

}