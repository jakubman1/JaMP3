import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {PlaylistMenu} from "./PlaylistMenu";
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
    id: string;
    name: string;
    songs_count: number;
}

export class PlaylistRow extends React.Component<Props> {
    state = {
        showPlaylistMenuComponent: false
    };

    showPlaylistMenuComponent = () => {
        this.setState({
            showPlaylistMenuComponent: !this.state.showPlaylistMenuComponent
        });
    };

    loadSongsInTable = () => {
        dbRequests.getActualPlaylist(this.props.id);
        dbRequests.getSongsTable(this.props.id);
    };

    render() {
        let playlistMenu = null;

        if (this.state.showPlaylistMenuComponent) {
            playlistMenu = (<PlaylistMenu id={this.props.id} callback={this.showPlaylistMenuComponent}/>);
        }

        return (
            <li>
                <span className="playlist-list-name" onClick={this.loadSongsInTable}>{this.props.name}</span>
                <FontAwesomeIcon onClick={this.showPlaylistMenuComponent} className="playlist-menu" icon={faEllipsisH}/>
                {playlistMenu}
                <span className="playlist-list-song-count">{this.props.songs_count} skladeb</span>
            </li>
        );
    }
}