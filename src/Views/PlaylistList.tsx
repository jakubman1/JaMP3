import * as React from 'react';
import "./PlaylistList.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faPlus} from '@fortawesome/free-solid-svg-icons'
import * as dbRequests from "../Controllers/dbRequests";
import {PlaylistRow} from "./PlaylistRow";
import {AddPlaylist} from "./AddPlaylist";
import {Link} from "react-router-dom";

interface Props {
}

interface State {
    playlists: object[];
    all_count: number;
    favourite_count: number;
    showAddPlaylistComponent: boolean;
    activePlaylistId: string;
}

export class PlaylistList extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            playlists: [],
            all_count: 0,
            favourite_count: 0,
            showAddPlaylistComponent: false,
            activePlaylistId: ""
        };
        dbRequests.emitter.on('playlistListChanged', (data: any) => this.loadPlaylists(data));
        dbRequests.getAllPlaylists();

        dbRequests.emitter.on('allPlaylistCount', (data: any) => this.loadAllSongsCount(data));
        dbRequests.getAllSongsCount();

        dbRequests.emitter.on('favouritePlaylistCount', (data: any) => this.loadFavouriteSongsCount(data));
        dbRequests.getFavouriteSongsCount();

        dbRequests.emitter.on('getActualPlaylist', (data: { _id: string, name: string }[]) => {
            this.setActivePlaylist(data[0]._id);
        });

        dbRequests.getPlaylistSongsCount();
    }

    setActivePlaylist = (id: string) => {
        this.setState({activePlaylistId: id});
    };

    loadPlaylists = (data: any) => {
        this.setState({playlists: data});
    };

    loadAllSongsCount = (data: any) => {
        this.setState({all_count: data});
    };

    loadFavouriteSongsCount = (data: any) => {
        this.setState({favourite_count: data});
    };

    showAddPlaylistComponent = () => {
        this.setState({
            showAddPlaylistComponent: !this.state.showAddPlaylistComponent
        });
    };

    loadAllSongs = () => {
        dbRequests.getActualPlaylist("all");
        dbRequests.getSongsTable("all");
    };

    loadFavouriteSongs = () => {
        dbRequests.getActualPlaylist("favourite");
        dbRequests.getSongsTable("favourite");
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let rows: any[] = [];
        let playlist: object;

        for (playlist of this.state.playlists) {
            // @ts-ignore
            const active = playlist._id === this.state.activePlaylistId;
            // @ts-ignore
            rows.push(<PlaylistRow id={playlist._id} name={playlist.name} active={active}/>);
            // @ts-ignore
        }

        let addPlaylist = null;

        if (this.state.showAddPlaylistComponent) {
            addPlaylist = (<AddPlaylist callback={this.showAddPlaylistComponent}/>);
        }

        let allClass = this.state.activePlaylistId === 'all' ?
            "playlist-list-name playlist-selected" : "playlist-list-name";
        let favouriteClass = this.state.activePlaylistId === 'favourite' ?
            "playlist-name-wrapper playlist-selected" : "playlist-name-wrapper";
        let favouriteInClass = this.state.activePlaylistId === 'favourite' ?
            "playlist-list-name playlist-selected" : "playlist-list-name";

        return (
            <div>
                <div className="top-list-wrapper">
                    <ul className="playlist-list">
                        <li>
                            <Link to="/home">
                                <span className={allClass}
                                      onClick={this.loadAllSongs}>Vše</span>
                            </Link>
                            <span className="playlist-list-song-count">{this.state.all_count} skladeb</span>


                        </li>
                        <li>

                            <div className={favouriteClass}>
                                <div className="playlist-icon-wrapper">
                                    <FontAwesomeIcon className="playlist-icon" icon={faStar}/>
                                </div>
                                <Link to="/home/favourite" className="no-decoration">
                                    <span className={favouriteInClass} onClick={this.loadFavouriteSongs}>Oblíbené</span>
                                </Link>
                            </div>
                            <span className="playlist-list-song-count">{this.state.favourite_count} skladeb</span>
                        </li>
                        <li onClick={this.showAddPlaylistComponent}>
                            <div className="playlist-name-wrapper">
                                <div className="playlist-icon-wrapper">
                                    <FontAwesomeIcon className="playlist-icon" icon={faPlus}/>
                                </div>
                                <span className="playlist-list-name">Přidat playlist</span>
                            </div>
                        </li>
                        <li>
                            {addPlaylist}
                        </li>
                    </ul>
                </div>
                <div className="bottom-list-wrapper">
                    <ul className="playlist-list">
                        {rows}
                    </ul>
                </div>
            </div>
        );
    }
}