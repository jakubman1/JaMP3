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
import {Welcome} from "./Views/Welcome"
import {PlaylistList} from "./Views/PlaylistList";
import {SearchBar} from "./Views/SearchBar";
import {Player} from "./Views/Player";
import {ImportFullscreen} from "./Views/Import/ImportFullscreen";

class JaMP3 extends React.Component {

    componentDidMount(){
        document.title = "JaMP3 | Just another music player"
    }

    render() {
        let activePlaylist = 'all';
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        return (
            <div className="JaMP3">
                <Router>
                    <Switch>
                        <Route path="/home">
                            <div className="sidebar-wrapper">
                                <h1 className="logo text-center">JaMP3</h1>
                                <PlaylistList activePlaylist={"adsd"}/>
                            </div>
                            <div className="search-bar-wrapper">
                                <SearchBar searchedText={"tvoje mama"}/>
                            </div>
                            <div className="center-wrapper">
                                <h2>Všechny skladby</h2>
                                <MusicTable playlist={activePlaylist}/>
                            </div>
                            <div className="now-playing-bar-wrapper">
                                <Player/>
                            </div>
                        </Route>
                        <Route path="/">
                            <Welcome/>
                        </Route>
                        <Route path="/import">
                            <ImportFullscreen/>
                        </Route>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default JaMP3