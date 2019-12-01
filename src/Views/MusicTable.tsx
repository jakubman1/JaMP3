import * as React from 'react';
import {MusicTableRow} from "./MusicTableRow";
import './MusicTable.scss'
import * as dbRequests from "../Controllers/dbRequests";

interface Props {}

interface State {
    songs: object[];
}

export class MusicTable extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            songs: []
        };

        dbRequests.emitter.on('songsTableChanged', (data: any) => this.loadSongs(data));
        dbRequests.getSongsTable("all");
    }

    loadSongs = (data: any) => {
        this.setState({
            songs: data
        });
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.state.songs.length !== 0) {
            let rows: any[] = [];
            let song: object;

            for (song of this.state.songs) {
                // @ts-ignore
                rows.push(<MusicTableRow id={song._id} name={song.title} album={song.album} author={song.author} length={song.length} path={song.path}/>)
            }

            return (
                <div className="center-wrapper">
                    <h1>Všechny skladby</h1>
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
                    <h1>Žádné skladby</h1>
                </div>
            );
        }
    }
}