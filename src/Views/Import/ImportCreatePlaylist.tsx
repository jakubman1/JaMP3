import React from "react";
import "./ImportCreatePlaylist.scss";
import {Link} from "react-router-dom";
import * as dbRequest from "../../Controllers/dbRequests";
import { useHistory } from "react-router-dom";


interface IProps {
    files: string[];
}

export class ImportCreatePlaylist extends React.Component<IProps> {

    state = {
        fileCount: 0,
        newPlaylistName: "",
        playlists: [] as {_id: string, name: string}[],
        selectedPlaylist: "__no__",
    };

    constructor(props: IProps) {
        super(props);
        dbRequest.getAllPlaylists();
        dbRequest.emitter.on('playlistListChanged', (playlists: {_id: string, name: string}[]) => {
            this.setState({
                playlists
            })
        });
    }

    componentWillUnmount(): void {
        dbRequest.emitter.removeListener('playlistListChanged',
            (playlists: {_id: string, name: string}[]) => {
            this.setState({
                playlists
            })
        })
    }

    handlePlaylistSelectChanged = (event: any) => {
        this.setState({selectedPlaylist: event.target.value});
    };

    compileHeading = () => {
        let mp3files = 0;
        let folders = 0;
        let result = "Bude importováno: ";
        for (let f of this.props.files) {
            if(f.toLowerCase().substr(-4) === '.mp3') {
                mp3files++;
            }
            else if(/^[a-zA-Z]:\\(((?![<>:"/\\|?*]).)+((?<![ .])\\)?)*$/.test(f)) {
                folders++;
            }
        }
        if(mp3files > 0) {
            result += mp3files.toString();
            if(mp3files === 1) {
                result += " soubor mp3";
            }
            else if( mp3files >= 2 && mp3files <= 4) {
                result += " soubory mp3";
            }
            else {
                result += " souborů mp3";
            }
            if(folders > 0) {
                result += " a ";
            }
        }
        if(folders > 0) {
            result += folders.toString();
            if(folders === 1) {
                result += " složka.";
            }
            else if( mp3files >= 2 && mp3files <= 4) {
                result += " složky.";
            }
            else {
                result += " složek.";
            }
        }
        if(folders === 0 && mp3files === 0) {
            return "Nevybrány žádné platné soubory."
        }

        return result;
    };

    handleFinish = () => {
        if(this.state.selectedPlaylist === "__new__") {
            if(this.state.newPlaylistName !== "") {
                dbRequest.createNewPlaylist(this.state.newPlaylistName);
                dbRequest.getAllPlaylists();
                this.finishImport();
            }
        }
        else if(this.state.selectedPlaylist === "__no__") {
            this.finishImport();
        }
        else {
            dbRequest.importMP3sToPlaylist(this.state.selectedPlaylist, this.props.files);
        }
    };

    finishImport = () => {
        dbRequest.importMP3s(this.props.files);
        dbRequest.getAllSongsCount();
    };

    handleNewPlaylistInputChange = (event: any) => {
        this.setState({newPlaylistName: event.target.value});
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let playlists = [];
        for(let p of this.state.playlists) {
            playlists.push(<option value={p._id}>{p.name}</option>);
        }
        let addPlaylistForm = null;
        if(this.state.selectedPlaylist === "__new__") {
            addPlaylistForm = (
                <div>
                    <span className="playlist-import-text">Napište název nového playlistu</span>
                    <input className="round-input playlist-import-name-input" type="text"
                    placeholder="Název playlistu..." onChange={this.handleNewPlaylistInputChange}
                    value={this.state.newPlaylistName}/>
                </div>
        );
        }
        const heading = this.compileHeading();
        return (
            <div className="fullscreen-wrapper">
                <h1>{heading}</h1>

                <select className="import-menu" onChange={this.handlePlaylistSelectChanged}
                        value={this.state.selectedPlaylist}>
                    <option value="__new__">+ Nový playlist</option>
                    <option value="__no__">Nepřidávat do playlistu</option>
                    {playlists}
                </select>

                {addPlaylistForm}

                <Link to="/home" className="btn btn-big btn-outline button-cancel">Zrušit</Link>

                <Link to="/home" className="btn btn-big btn-outline button-import" onClick={this.handleFinish}>Import</Link>
            </div>
        );
    }
}