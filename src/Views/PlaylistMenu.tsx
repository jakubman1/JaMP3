import React from 'react';
import * as dbRequests from "../Controllers/dbRequests";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {RenamePlaylist} from "./RenamePlaylist";

interface Props {
    id: string;
    callback: any;
    playlistName: string;
}

export class PlaylistMenu extends React.Component<Props> {
    state = {
        showRenamePlaylist: false
    };

    showRenamePlaylist = () => {
        this.setState({
            showRenamePlaylist: !this.state.showRenamePlaylist
        });
    };

    deletePlaylist = () => {
        dbRequests.deletePlaylist(this.props.id);
        dbRequests.getAllPlaylists();
        this.props.callback();
    };

    render() {
        let renamePlaylist = null;

        if (this.state.showRenamePlaylist) {
            renamePlaylist = (<RenamePlaylist id={this.props.id} playlistName={this.props.playlistName} callback={this.props.callback}/>);
        }

        return(
            <span>
                <FontAwesomeIcon onClick={this.showRenamePlaylist} className="playlist-menu" icon={faPencilAlt}/>
                {renamePlaylist}
                <FontAwesomeIcon onClick={this.deletePlaylist} className="playlist-menu" icon={faTrashAlt}/>
            </span>
        )
    }
}