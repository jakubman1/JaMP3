import React from 'react';
import './JaMP3.scss';
import './Views/MusicTable'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {MusicTable} from "./Views/MusicTable";
import {Welcome} from "./Views/Welcome"
import {PlaylistList} from "./Views/PlaylistList";
import {SearchBar} from "./Views/SearchBar";
import {Settings} from "./Views/Settings";
import {Player} from "./Views/Player";
import {ImportFullscreen} from "./Views/Import/ImportFullscreen";
import {ImportPopup} from "./Views/Import/ImportPopup";
import * as importFinished from './Controllers/importFinishedController';
import * as dbRequest from "./Controllers/dbRequests";

class JaMP3 extends React.Component {

    state = {
        draggedOver: false
    };

    constructor(props: any) {
        super(props);
        importFinished.importFinished.on('importFinished', () => {
            this.setState({draggedOver: false});
            dbRequest.getSongsTable('all');
        });
    }

    componentDidMount() {
        document.title = "JaMP3 | Just another music player"
    }

    componentWillUnmount(): void {
        importFinished.importFinished.removeListener('importFinished', () => {
            this.setState({draggedOver: false});
            dbRequest.getSongsTable('all');
        });
    }

    handleDragOver = (e: any) => {
        this.setState({draggedOver: true});
        let event = e as Event;
        //event.stopPropagation();
        event.preventDefault();
    };

    /*handleDragLeave = (e: any) => {
        this.setState({draggedOver: false});
        return false;
    };*/

    render() {
        let dragOverBox = null;
        if(this.state.draggedOver) {
            dragOverBox = (<ImportPopup/>);
        }
        let activePlaylist = 'all';
        //console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        return (
            <div className="JaMP3"
            onDragEnter={this.handleDragOver}>
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
                            {dragOverBox}
                            <MusicTable/>
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