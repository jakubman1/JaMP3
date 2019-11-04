import * as React from 'react';
import "./SearchBar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'

interface Props {
    searchedText: string;
}

export class SearchBar extends React.Component<Props> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="search-bar-wrapper">

                <select className="search-bar-menu">
                    <option value="tvoje_mama">Vše</option>
                    <option value="tvoje_tata">Adam je pukavec</option>
                </select>

                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <input className="search-bar" type="text" name="searched-text" placeholder="Vyhledat..." />

                <div className="search-bar-icons">
                    <FontAwesomeIcon className="download-icon" icon={faDownload} />
                    <FontAwesomeIcon className="settings-icon" icon={faCog} />
                </div>
            </div>
        );
    }
}