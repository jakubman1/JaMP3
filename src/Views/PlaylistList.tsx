import * as React from 'react';
import "./PlaylistList.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlus} from '@fortawesome/free-solid-svg-icons'
import {PlaylistController} from "../Controllers/PlaylistController";
import {Playlist} from "../Shared/Playlist";
import {PlaylistRow} from "./PlaylistRow";

interface Props {
    activePlaylist: string;
}

export class PlaylistList extends React.Component<Props> {

    state = {
        playlists: [] as Playlist[],
        all_count: 0 as number,
        favourite_count: 0 as number
    };

    playlistController: PlaylistController = new PlaylistController();

    loadPlaylists(): Promise<object[]> {
        return this.playlistController.fetchPlaylists();
    }

    loadAllCount(): Promise<number> {
        return this.playlistController.fetchAllCount();
    }

    loadFavouriteCount(): Promise<number> {
        return this.playlistController.fetchFavouriteCount();
    }

    constructor(props: any) {
        super(props);
        this.loadPlaylists()
            .then(data => {
                this.setState({playlists: data});
                return true;
            })
            .catch(err => console.warn(err));

        this.loadAllCount()
            .then(data => {
                this.setState({all_count: data});
                return true;
            })
            .catch(err => console.warn(err));

        this.loadFavouriteCount()
            .then(data => {
                this.setState({favourite_count: data});
                return true;
            })
            .catch(err => console.warn(err));

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let rows: any[] = [];
        let playlist: Playlist;

        for (playlist of this.state.playlists) {
            rows.push(<PlaylistRow id={playlist.id} name={playlist.name} songs_count={playlist.songs_count}/>);
        }

        return (
            <div>
                <div className="top-list-wrapper">
                    <ul className="playlist-list">
                        <li>
                            <span className="playlist-list-name">Vše</span>
                            <span className="playlist-list-song-count">{this.state.all_count} skladeb</span>
                        </li>
                        <li>
                            <div className="playlist-icon-wrapper">
                                <FontAwesomeIcon className="playlist-icon" icon={faStar} />
                            </div>
                            <span className="playlist-list-name">Oblíbené</span>
                            <span className="playlist-list-song-count">{this.state.favourite_count} skladeb</span>
                        </li>
                        <li>
                            <div className="playlist-icon-wrapper">
                                <FontAwesomeIcon className="playlist-icon" icon={faPlus} />
                            </div>
                            <span className="playlist-list-name">Přidat playlist</span>
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