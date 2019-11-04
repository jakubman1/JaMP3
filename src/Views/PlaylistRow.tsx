import * as React from 'react'
import {Link} from 'react-router-dom';

export const PlaylistRow: React.FunctionComponent<{
    id: string;
    name: string;
    songs_count: number;
}> = (props) => {
    return (
        <li>
            <span className="playlist-list-name">{props.name}</span>
            <span className="playlist-list-song-count">{props.songs_count} skladeb</span>
        </li>
    );
};