import * as React from 'react';
import "./SearchBar.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faDownload, faSearch} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import * as dbRequest from "../Controllers/dbRequests";

interface IProps {}
export class SearchBar extends React.Component<IProps> {

    state = {
        playlists: [] as {_id: string, name: string}[]
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

    render() {
        let playlists = [];
        for(let p of this.state.playlists) {
            playlists.push(<option value={p._id}>{p.name}</option>);
        }
        return (
            <div className="search-bar-wrapper">

                <select className="search-bar-menu">
                    <option value="all">Vše</option>
                    <option value="favourite">Oblíbené</option>
                    {playlists}
                </select>

                <FontAwesomeIcon className="search-icon" icon={faSearch}/>
                <input className="search-bar" type="text" name="searched-text" placeholder="Vyhledat..."/>
                <Link to='/import'>
                    <FontAwesomeIcon className="icon download-icon" icon={faDownload}/>
                </Link>
                <Link to='/settings'>
                    <FontAwesomeIcon className="icon settings-icon" icon={faCog}/>
                </Link>

            </div>

        );
    }
}