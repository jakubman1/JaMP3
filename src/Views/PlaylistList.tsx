import * as React from 'react';
import "./PlaylistList.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlus} from '@fortawesome/free-solid-svg-icons'
import {PlaylistController} from "../Controllers/PlaylistController";
import {MusicTableController} from "../Controllers/MusicTableController";
import {Playlist} from "../Shared/Playlist";
import {PlaylistRow} from "./PlaylistRow";

interface Props {
    activePlaylist: string;
}

export class PlaylistList extends React.Component<Props> {
    all_count: number = 420;

    state = {
        playlists: [] as Playlist[]
    };

    playlistController: PlaylistController = new PlaylistController();

    loadData(): Promise<object[]> {
        return this.playlistController.fetchPlaylists();
    }

    constructor(props: any) {
        super(props);
        this.loadData()
            .then(data => {
                this.setState({playlists: data});
                return true;
            })
            .catch(err => console.warn(err));

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{playlists: Playlist[]}>, snapshot?: any): void {
        if (prevState.playlists !== this.state.playlists) {
            this.setState({
                playlists: this.state.playlists
            });
            this.loadData()
                .then(data => {
                    this.setState({playlists: data});
                    return true;
                })
                .catch(err => console.warn(err));
        }
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
                            <span className="playlist-list-song-count">{this.all_count} skladeb</span>
                        </li>
                        <li>
                            <div className="playlist-icon-wrapper">
                                <FontAwesomeIcon className="playlist-icon" icon={faStar} />
                            </div>
                            <span className="playlist-list-name">Oblíbené</span>
                            <span className="playlist-list-song-count">420 skladeb</span>
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