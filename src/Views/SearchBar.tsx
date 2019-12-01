import * as React from 'react';
import "./SearchBar.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faDownload, faSearch} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";


export class SearchBar extends React.Component {
    render() {
        return (
            <div className="search-bar-wrapper">

                <select className="search-bar-menu">
                    <option value="tvoje_mama">Vše</option>
                    <option value="tvoje_tata">Adam je pukavec</option>
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