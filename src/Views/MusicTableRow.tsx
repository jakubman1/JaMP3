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

    state = {
        showMoreOptions: false,
        showPlaylists: false,
        hoverOverAddToPlaylist: false,
        hoverOverPlaylists: false,
        playlists: [] as {_id: string, name: string}[],
        songsPlaylists: [] as string[]
    };

    constructor(props: any) {
        super(props);

        dbRequests.emitter.on('playlistListChanged', (playlists: {_id: string, name: string}[]) => {
            this.setState({
                playlists
            })
        });
        dbRequests.getAllPlaylists();

        dbRequests.emitter.on('getPlaylistsWithThisSong', (songsPlaylists: any) => {
            this.setState({
                songsPlaylists: songsPlaylists
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
        dbRequests.getPlaylistSongsCount();
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
       dbRequests.getPlaylistSongsCount();
       this.setState({
           showMoreOptions: false,
           showPlaylists: false,
           hoverOverAddToPlaylist: false,
           hoverOverPlaylists: false,
       });
    };

    deleteSong = (event: any) => {
        event.stopPropagation();
        dbRequests.removeMP3s(this.props.id);
        dbRequests.getSongsTable(this.props.playlistId);
        dbRequests.getFavouriteSongsCount();
        dbRequests.getAllSongsCount();
        dbRequests.getPlaylistSongsCount();
        this.setState({
            showMoreOptions: false,
            showPlaylists: false,
            hoverOverAddToPlaylist: false,
            hoverOverPlaylists: false,
        });
    };

    showMoreOptions = (event: any) => {
        event.stopPropagation();
        if (this.state.showMoreOptions) {
            dbRequests.getPlaylistsWithThisSong(this.props.id);
        }
        this.setState({
            showMoreOptions: !this.state.showMoreOptions
        });
<<<<<<< HEAD
=======
        console.log(this.props.id);
        dbRequests.getPlaylistsWithThisSong(this.props.id);
>>>>>>> 9d8b7460736a0d36d95e419a79f6f13e8aaac890
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

     doesContain = (id: string) => {
        for (let element of this.state.songsPlaylists) {
            if (element === id) {
                return true;
            }
        }
        return false;
     };

    render() {
        let star = (<FontAwesomeIcon icon={faStarO} className="song-row-icon" onClick={this.addSongToFavourite}/>);
        if(this.props.favourite) {
            star = (<FontAwesomeIcon icon={faStar} className="song-row-icon song-favourite" onClick={this.addSongToFavourite}/>);
        }

        let deleteFromPlaylistOption = null;
        if (this.props.playlistId !== "all" && this.props.playlistId !== "favourite") {
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
                    <div className="back-screen" onClick={this.showMoreOptions} onScroll={this.showMoreOptions}/>
                </div>
            );
        }

        let playlistsNames = null;
        if (this.state.showPlaylists) {
            let playlists = [];
            for(let p of this.state.playlists) {
                if (!this.doesContain(p._id)) {
                    playlists.push(<div onClick={(e) => this.addToPlaylist(e, p._id)}>{p.name}</div>);
                }
            }

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
