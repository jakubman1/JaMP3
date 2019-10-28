import * as React from 'react'
import {Link} from 'react-router-dom';

export const MusicTableRow: React.FunctionComponent<{
    name: string;
    album?: string;
    author?: string;
    length: string;
    path: string;
    id: string;
}> = (props) => {
    return (
        <tr className="song-row">
            <td className="song-name">{props.name}</td>
            <td>{props.album ? props.album : ''}</td>
            <td>{props.author ? props.author : ''}</td>
            <td>{props.length}</td>
            <td>Tu budou ikony lol</td>
        </tr>
    );
};
