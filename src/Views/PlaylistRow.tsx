import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {PlaylistMenu} from "./PlaylistMenu";
import * as dbRequests from "../Controllers/dbRequests";
import {Link} from "react-router-dom";

interface Props {
    id: string;
    name: string;
    active: boolean;
}

export class PlaylistRow extends React.Component<Props> {
    state = {
        showPlaylistMenuComponent: false,
        songsCount: 0
    };

    constructor(Props: any) {
        super(Props);

        dbRequests.emitter.on('getPlaylistSongsCount', (data: any) => this.getSongsCount(data));
    }

    showPlaylistMenuComponent = () => {
        this.setState({
            showPlaylistMenuComponent: !this.state.showPlaylistMenuComponent
        });
    };

    loadSongsInTable = () => {
        dbRequests.getActualPlaylist(this.props.id);
        dbRequests.getSongsTable(this.props.id);
    };

    getSongsCount = (data: any) => {
        if (data._id === this.props.id) {
            this.setState({
                songsCount: data.count
            });
        }
    };

    render() {
        let playlistMenu = null;

        if (this.state.showPlaylistMenuComponent) {
            playlistMenu = (<PlaylistMenu id={this.props.id} playlistName={this.props.name}
                                          callback={this.showPlaylistMenuComponent}/>);
        }
        const active = this.props.active ? ' playlist-selected' : '';
        return (
            <li>
                <Link to="/home">
                <span className={"playlist-list-name" + active}
                      onClick={this.loadSongsInTable}>{this.props.name}</span>
                </Link>
                <FontAwesomeIcon onClick={this.showPlaylistMenuComponent} className="playlist-menu" icon={faEllipsisH}/>
                {playlistMenu}
                <span className="playlist-list-song-count">{this.state.songsCount} skladeb</span>
            </li>
        );
    }
}