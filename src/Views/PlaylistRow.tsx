import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {PlaylistMenu} from "./PlaylistMenu";

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

    render() {
        let playlistMenu = null;

        if (this.state.showPlaylistMenuComponent) {
            playlistMenu = (<PlaylistMenu id={this.props.id} callback={this.showPlaylistMenuComponent}/>);
        }

        return (
            <li>
                <span className="playlist-list-name">{this.props.name}</span>
                <FontAwesomeIcon onClick={this.showPlaylistMenuComponent} className="playlist-menu" icon={faEllipsisH}/>
                {playlistMenu}
                <span className="playlist-list-song-count">{this.props.songs_count} skladeb</span>
            </li>
        );
    }
}