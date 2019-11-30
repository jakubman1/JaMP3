import * as React from 'react'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {faStar as star} from '@fortawesome/free-regular-svg-icons'
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
            <td className="song-row-icon-wrapper"><FontAwesomeIcon icon={star} className="song-row-icon"/>
            <FontAwesomeIcon icon={faEllipsisH} className="song-row-icon" /></td>
        </tr>
    );
};
