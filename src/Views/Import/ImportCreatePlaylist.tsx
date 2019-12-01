import React from "react";
import "./ImportFullscreen.scss";

export class ImportFullscreen extends React.Component {

    props = {
        fileCount: 0,
        newPlaylistName: "",
        playlists: [] as string[]
    };


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let playlists = [];
        for(let p of this.props.playlists) {
            playlists.push(<option>{p}</option>);
        }
        return (
            <div className="fullscreen-wrapper">
                <h1>Vybráno {this.props.fileCount} souborů</h1>

                <select>
                    <option>+ Nový playlist</option>
                    <option selected>Nepřidávat do playlistu</option>
                    {playlists}
                </select>
            </div>
        );
    }
}4