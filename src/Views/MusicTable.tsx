import * as React from 'react'
import {MusicTableController} from "../Controllers/MusicTableController";

interface Props {
    playlist: string;
}

export class MusicTable extends React.Component<Props> {

    musicTableController: MusicTableController = new MusicTableController();

    constructor(props: any) {
        super(props);
        this.loadData()
            .then(data => {
                if(data) {
                    this.setState({
                        loaded: true,
                        songs: data
                    });
                }
                else {
                    this.setState({
                        loaded: true,
                        songs: []
                    });
                }
                console.log('GOT DATA');
                console.log(data);
                return true;
            })
            .catch(err => console.warn(err));

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.playlist !== this.props.playlist) {
            this.setState({
                    loaded: false,
                    songs: this.state.songs
                });
            this.loadData()
                .then(data => {
                    this.setState({
                       loaded: true,
                       songs: data
                    });
                })
                .catch(err => console.warn(err));
        }
    }

    state = {
        loaded: false,
        songs: [] as object[],
    };

    loadData(): Promise<object[]> {
        return this.musicTableController.fetchSongTable(this.props.playlist);
    }


    handleRowClick = (row: number) => {

    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!this.state.loaded) {
            return (
                <h1>Loading...</h1>
            );
        } else if (this.state.songs.length !== 0) {
            return (
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
                </table>
            )
        } else {
            return (
                <h1>No songs</h1>
            );
        }

    }

}