import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

interface Props {
    name: string;
    album?: string;
    author?: string;
    length?: string;
    path: string;
    id: string;
}

export class MusicTableRow extends React.Component<Props> {
    render() {
        return (
            <tr className="song-row">
                <td className="song-name">{this.props.name}</td>
                <td>{this.props.album ? this.props.album : ''}</td>
                <td>{this.props.author ? this.props.author : ''}</td>
                <td>{this.props.length ? this.props.author : ''}</td>
                <td className="song-row-icon-wrapper">
                    <FontAwesomeIcon icon={faStar} className="song-row-icon"/>
                    <FontAwesomeIcon icon={faEllipsisH} className="song-row-icon"/>
                </td>
            </tr>
        );
    }
}
