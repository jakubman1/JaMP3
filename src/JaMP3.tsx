import React from 'react';
import ReactDom from 'react-dom';
import './JaMP3.scss';
import './Views/MusicTable'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {MusicTable} from "./Views/MusicTable";

const JaMP3: React.FC = () => {
        let activePlaylist = 'all';
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        return (
            <div className="JaMP3">
                <Router>
                    <Switch>
                        <Route path="/home">
                            <h1 className="logo">JaMP3</h1>
                            <h1 className="text-center">All music</h1>
                            <MusicTable playlist={activePlaylist} />
                        </Route>
                        <Route path="/">
                            <h1 className="logo text-center">JaMP3</h1>
                            <h2 className="fancy-subheading text-center">Just Another Music Player</h2>
                            <Link to="/home" className="btn btn-big btn-outline text-center">Pokračovat</Link>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
};

export default JaMP3