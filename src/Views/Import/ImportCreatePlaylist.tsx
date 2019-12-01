import React from "react";
import "./ImportCreatePlaylist.scss";

export class ImportCreatePlaylist extends React.Component {

    state = {
        fileCount: 0,
        newPlaylistName: "",
        playlists: [] as string[]
    };


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let playlists = [];
        for(let p of this.state.playlists) {
            playlists.push(<option>{p}</option>);
        }
        return (
            <div className="fullscreen-wrapper">
                <h1>Vybráno {this.state.fileCount} souborů</h1>

                <select>
                    <option>+ Nový playlist</option>
                    <option selected>Nepřidávat do playlistu</option>
                    {playlists}
                </select>
            </div>
        );
    }
}