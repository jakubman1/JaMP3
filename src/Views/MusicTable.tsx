import * as React from 'react';
import {MusicTableRow} from "./MusicTableRow";
import './MusicTable.scss'
import * as dbRequests from "../Controllers/dbRequests";

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

        dbRequests.emitter.on('sendPlaylistId', (data: any) => this.loadPlaylistId(data));
        dbRequests.sendPlaylistId("all");

        dbRequests.emitter.on('getPlaylistName', (data: any) => this.getPlaylistName(data));
        dbRequests.getPlaylistName("all");
    }

    loadSongs = (data: any) => {
        this.setState({
            songs: data
        });
    };

    loadPlaylistId = (data: any) => {
        this.setState({
            playlistId: data
        });
    };

    getPlaylistName = (data: any) => {
        this.setState({
            playlistName: data
        });
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.state.songs.length !== 0) {
            let rows: any[] = [];
            let song: object;

            for (song of this.state.songs) {
                console.log(song);
                // @ts-ignore
                rows.push(<MusicTableRow playlistId={this.state.playlistId} id={song._id} name={song.title} album={song.album} author={song.author} length={song.length} path={song.path} favourite={song.favourite}/>)
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