import React from "react";
import "./ImportCreatePlaylist.scss";
import {Link} from "react-router-dom";

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

                <select className="import-menu">
                    <option>+ Nový playlist</option>
                    <option>Nepřidávat do playlistu</option>
                    {playlists}
                </select>

                <span className="playlist-import-text">Napište název nového playlistu</span>
                <input className="round-input playlist-import-name-input" type="text" placeholder="Název playlistu..."/>

                <Link to="/home" className="btn btn-big btn-outline button-cancel">Zrušit</Link>

                <div className="btn btn-big btn-outline button-import">Import</div>
            </div>
        );
    }
}