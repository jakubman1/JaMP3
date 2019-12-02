import * as React from 'react';
import {MusicTableRow} from "./MusicTableRow";
import './MusicTable.scss'
import * as dbRequests from "../Controllers/dbRequests";
import {emitter} from "../Controllers/dbRequests";

interface Props {}

interface State {
    songs: object[];
    playlistId: string;
    playlistName: string;
}

export class MusicTable extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            songs: [],
            playlistId: "all",
            playlistName: "Všechny skladby"
        };

        dbRequests.emitter.on('songsTableChanged', (data: any) => this.loadSongs(data));
        dbRequests.getSongsTable("all");

        dbRequests.emitter.on('getActualPlaylist', (data: any) => this.loadActualPlaylist(data));
        dbRequests.getActualPlaylist("all");
    }

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
        let songsArray: object[] = [];
        let newSong: { _id: string, path: string } = {_id: "", path: ""};
        let song: object;
        let songIndex = -1;
        let i = 0;

        for (song of this.state.songs) {
            // @ts-ignore
            if (songId === song._id) {
                songIndex = i;
            }
            // @ts-ignore
            newSong = {_id: song._id, path: song.path};
            songsArray.push(newSong);
            i++;
        }
        emitter.emit('getSongsInActivePlaylist', songsArray);
        emitter.emit('getSongIndex', songIndex);
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.state.songs.length !== 0) {
            let rows: any[] = [];
            let song: object;

            for (song of this.state.songs) {
                console.log(song);
                // @ts-ignore
                rows.push(<MusicTableRow callback={this.handleSongClick} playlistId={this.state.playlistId} id={song._id} name={song.title} album={song.album} author={song.author} length={song.length} path={song.path} favourite={song.favourite}/>)
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