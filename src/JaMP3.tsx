import React from 'react';
import './JaMP3.scss';
import './Views/MusicTable'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {MusicTable} from "./Views/MusicTable";
import {Welcome} from "./Views/Welcome"
import {PlaylistList} from "./Views/PlaylistList";
import {SearchBar} from "./Views/SearchBar";
import {Settings} from "./Views/Settings";
import {Player} from "./Views/Player";
import {ImportFullscreen} from "./Views/Import/ImportFullscreen";
import {ImportCreatePlaylist} from "./Views/Import/ImportCreatePlaylist";

class JaMP3 extends React.Component {

    componentDidMount() {
        document.title = "JaMP3 | Just another music player"
    }

    render() {
        let activePlaylist = 'all';
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        return (
            <div className="JaMP3">
                <Router>
                    <div className="sidebar-wrapper">
                        <h1 className="logo text-center">JaMP3</h1>
                        <PlaylistList/>
                    </div>
                    <div className="search-bar-wrapper">
                        <SearchBar/>
                    </div>
                    <div className="now-playing-bar-wrapper">
                        <Player/>
                    </div>

                    <Switch>
                        <Route path="/home">
                            <MusicTable/>
                        </Route>
                        <Route path="/import/playlist">
                            <ImportCreatePlaylist />
                        </Route>
                        <Route path="/import">
                            <ImportFullscreen/>
                        </Route>
                        <Route path="/settings">
                            <Settings/>
                        </Route>
                        <Route path="/">
                            <Welcome/>
                        </Route>

                    </Switch>
                </Router>

            </div>
        );
    }
}

export default JaMP3