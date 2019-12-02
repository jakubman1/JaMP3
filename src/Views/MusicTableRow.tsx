import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons'
import * as dbRequests from "../Controllers/dbRequests";
import "./MusicTableRow.scss";

interface Props {
    name: string;
    album?: string;
    author?: string;
    length?: string;
    path: string;
    id: string;
    playlistId: string;
    favourite: boolean;

    callback: any;
}

export class MusicTableRow extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        dbRequests.getAllPlaylists();
        dbRequests.emitter.on('playlistListChanged', (playlists: {_id: string, name: string}[]) => {
            this.setState({
                playlists
            })
        });
    }

    addSongToFavourite = (event: any) => {
        event.stopPropagation();
        if(this.props.favourite) {
            dbRequests.removeSongToFavourite(this.props.id);
        }
        else {
            dbRequests.addSongToFavourite(this.props.id);
        }
        dbRequests.getSongsTable(this.props.playlistId);
        dbRequests.getFavouriteSongsCount();
    };

    handleClick = () => {
        this.props.callback(this.props.id);
    };

    addToPlaylist = (event: any, _id: any) => {
       event.stopPropagation();
        dbRequests.addSongToPlaylist(this.props.id, _id);
        this.setState({
            showMoreOptions: false,
            showPlaylists: false,
            hoverOverAddToPlaylist: false,
            hoverOverPlaylists: false,
        });
    };

    deleteFromPlaylist = (event: any) => {
       event.stopPropagation();
       dbRequests.removeSongFromPlaylist(this.props.id, this.props.playlistId);
       dbRequests.getSongsTable(this.props.playlistId);
       dbRequests.getAllSongsCount();
    }

    deleteSong = (event: any) => {
        event.stopPropagation();
        dbRequests.removeMP3s(this.props.id);
        dbRequests.getSongsTable(this.props.playlistId);
        dbRequests.getAllSongsCount();
    }


    state = {
        showMoreOptions: false,
        showPlaylists: false,
        hoverOverAddToPlaylist: false,
        hoverOverPlaylists: false,
        playlists: [] as {_id: string, name: string}[],
    };

    showMoreOptions = (event: any) => {
        event.stopPropagation();
        this.setState({
            showMoreOptions: !this.state.showMoreOptions
        });
    };

    showPlaylists = () => {
        if (this.state.hoverOverAddToPlaylist || this.state.hoverOverPlaylists) {
            this.setState({
                showPlaylists: true
            });
        }
        else {
            this.setState({
                showPlaylists: false
            });
        }
     };

    hoverOverAddToPlaylist = () => {
        this.setState({
            hoverOverAddToPlaylist: !this.state.hoverOverAddToPlaylist
        }, () => {
            this.showPlaylists();
        });
    };

     hoverOverPlaylists = () => {
        this.setState({
            hoverOverPlaylists: !this.state.hoverOverPlaylists
        }, () => {
            this.showPlaylists();
        });
    };

     stopEventPropagation = (event: any) => {
        event.stopPropagation();
     };

    render() {
        let star = (<FontAwesomeIcon icon={faStarO} className="song-row-icon" onClick={this.addSongToFavourite}/>);
        if(this.props.favourite) {
            star = (<FontAwesomeIcon icon={faStar} className="song-row-icon song-favourite" onClick={this.addSongToFavourite}/>);
        }

        let deleteFromPlaylistOption = null;
        if (this.props.playlistId != "all" && this.props.playlistId != "favourite") {
            deleteFromPlaylistOption = (<div onClick={this.deleteFromPlaylist}>Odebrat z playlistu</div>);
        }

        let moreOptions = null;
        if (this.state.showMoreOptions) {
            moreOptions = (
                <div>
                    <div className="more-options">
                        <div onMouseEnter={this.hoverOverAddToPlaylist} onMouseLeave={this.hoverOverAddToPlaylist} onClick={this.stopEventPropagation}>Přidat do playlistu</div>
                        {deleteFromPlaylistOption}
                        <div onClick={this.deleteSong}>Odebrat</div>
                    </div>
                    <div className="back-screen" onClick={this.showMoreOptions}/>
                </div>
            );
        }

        let playlists = [];
        for(let p of this.state.playlists) {
            {/*TODO replace this condition with all the song's playlist's IDs*/}
            if (p._id != this.props.playlistId) {
                playlists.push(<div onClick={(e) => this.addToPlaylist(e, p._id)}>{p.name}</div>);
            }
        }

        let playlistsNames = null;
        if (this.state.showPlaylists) {
            playlistsNames = (
            <div className="playlists" onMouseEnter={this.hoverOverPlaylists} onMouseLeave={this.hoverOverPlaylists}>
                {playlists}
            </div>
            );
        }

        return (
            <tr className="song-row" onClick={this.handleClick}>
                <td className="song-name">{this.props.name}</td>
                <td>{this.props.album ? this.props.album : ''}</td>
                <td>{this.props.author ? this.props.author : ''}</td>
                <td>{this.props.length ? this.props.author : ''}</td>
                <td className="song-row-icon-wrapper">
                    {star}
                    <FontAwesomeIcon icon={faEllipsisH} className="song-row-icon" onClick={this.showMoreOptions}/>
                </td>
                    {moreOptions}
                    {playlistsNames}
            </tr>
        );
    }
}
