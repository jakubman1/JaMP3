import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

interface Props {
    id: string;
    name: string;
    songs_count: number;
}

export class PlaylistRow extends React.Component<Props> {
    render() {
        return (
            <li>
                <span className="playlist-list-name">{this.props.name}</span>
                <FontAwesomeIcon icon={faEllipsisH}/>
                <span className="playlist-list-song-count">{this.props.songs_count} skladeb</span>
            </li>
        );
    }
}