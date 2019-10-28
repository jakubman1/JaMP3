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
import { Welcome } from "./Views/Welcome"

const JaMP3: React.FC = () => {
        let activePlaylist = 'all';
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        return (
            <div className="JaMP3">
                <Router>
                    <Switch>
                        <Route path="/home">
                            <div className="sidebar-wrapper">
                                <h1 className="logo text-center">JaMP3</h1>
                            </div>
                            <div className="center-wrapper">
                                <h2>Všechny skladby</h2>
                                <MusicTable playlist={activePlaylist} />
                            </div>
                        </Route>
                        <Route path="/">
                            <Welcome />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
};

export default JaMP3