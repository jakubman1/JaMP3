import React from 'react';
import ReactDom from 'react-dom';
import './JaMP3.scss';


let electron = window.require('electron').remote;


const JaMP3: React.FC = () => {
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        let db = electron.getGlobal('db');
        db.insert({name : "fender jazz bass", year:1977});
        return (
            <div className={"JaMP3"}>
                <h1>Hello db</h1>
            </div>
        );
};

export default JaMP3