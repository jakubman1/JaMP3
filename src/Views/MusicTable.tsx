import * as React from 'react';
import {MusicTableRow} from "./MusicTableRow";
import './MusicTable.scss'
import * as dbRequests from "../Controllers/dbRequests";
import {emitter} from "../Controllers/dbRequests";

interface Props {
    initPlaylist?: string
}

interface State {
    songs: object[];
    playlistId: string;
    playlistName: string;
    highlightSong: string;
    playlistWithHighlightedSong: string;
}

export class MusicTable extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        if(this.props.initPlaylist === 'favourite') {
            this.state = {
                songs: [],
                playlistId: "favourite",
                playlistName: "Oblíbené skladby",
                highlightSong: "",
                playlistWithHighlightedSong: ""
            };
        }
        else {
            this.state = {
                songs: [],
                playlistId: "all",
                playlistName: "Všechny skladby",
                highlightSong: "",
                playlistWithHighlightedSong: ""
            };
        }


        dbRequests.emitter.on('songsTableChanged', (data: any) => this.loadSongs(data));

        dbRequests.emitter.on('getActualPlaylist', (data: any) => this.loadActualPlaylist(data));

        dbRequests.emitter.on('searchSongsInPlaylist', (data: any) => {this.loadSongs(data); this.searching("Vyhledávání")});

        dbRequests.emitter.on('playingSongChanged', (data: any) => this.highlightPlayingSong(data));
    }

    componentDidMount(): void {
        if(this.props.initPlaylist === 'favourite') {
            dbRequests.getSongsTable("favourite");
            dbRequests.getActualPlaylist("favourite");
        }
        else {
            dbRequests.getSongsTable("all");
            dbRequests.getActualPlaylist("all");
        }

    }

    searching = (newValue: string) => {
        this.setState({
            playlistName: newValue
        });
    };

    highlightPlayingSong = (data: any) => {
        this.setState({
            highlightSong: data.songId,
            playlistWithHighlightedSong: data.playlistId
        });
    };

    loadSongs = (data: any) => {
        this.setState({
            songs: data
        });
    };

    loadActualPlaylist = (data: any) => {
        this.setState({
            playlistId: data[0]._id,
            playlistName: data[0].name
        });
    };

    handleSongClick = (songId: string) => {
        let song: object;
        let songIndex = -1;
        let i = 0;

        for (song of this.state.songs) {
            // @ts-ignore
            if (songId === song._id) {
                songIndex = i;
            }
            i++;
        }
        emitter.emit('getSongsInActivePlaylist', {playlistId: this.state.playlistId, index: songIndex, array: this.state.songs});
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.state.songs.length !== 0) {
            let rows: any[] = [];
            let song: object;

            for (song of this.state.songs) {
                // @ts-ignore
                rows.push(<MusicTableRow highlight={this.state.highlightSong === song._id && this.state.playlistWithHighlightedSong === this.state.playlistId} callback={this.handleSongClick} playlistId={this.state.playlistId} id={song._id} name={song.title} album={song.album} author={song.author} length={song.length} path={song.path} favourite={song.favourite}/>)
            }
            return (
                <div className="center-wrapper">
                    <h1>{this.state.playlistName}</h1>

                    <table className="song-table">
                        <thead>
                        <tr className="song-table-header">
                            <th>Název</th>
                            <th>Album</th>
                            <th>Autor</th>
                            <th>Délka</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div className="center-wrapper">
                    <h1>{this.state.playlistName}</h1>
                    <h2>Žádné skladby...</h2>
                </div>
            );
        }
    }
}