import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons'
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
    name: string;
    album?: string;
    author?: string;
    length?: string;
    path: string;
    id: string;
    playlistId: string;
    favourite: boolean;

    callback: any;
}

export class MusicTableRow extends React.Component<Props> {

    constructor(props: any) {
        super(props);
    }

    addSongToFavourite = () => {
        if(this.props.favourite) {
            dbRequests.removeSongToFavourite(this.props.id);
        }
        else {
            dbRequests.addSongToFavourite(this.props.id);
        }
        dbRequests.getSongsTable(this.props.playlistId);
        dbRequests.getFavouriteSongsCount();
    };

    handleClick = () => {
        this.props.callback(this.props.id);
    };

    render() {
        let star = (<FontAwesomeIcon icon={faStarO} className="song-row-icon" onClick={this.addSongToFavourite}/>);
        if(this.props.favourite) {
            star = (<FontAwesomeIcon icon={faStar} className="song-row-icon song-favourite" onClick={this.addSongToFavourite}/>);
        }
        return (
            <tr className="song-row" onClick={this.handleClick}>
                <td className="song-name">{this.props.name}</td>
                <td>{this.props.album ? this.props.album : ''}</td>
                <td>{this.props.author ? this.props.author : ''}</td>
                <td>{this.props.length ? this.props.author : ''}</td>
                <td className="song-row-icon-wrapper">
                    {star}
                    <FontAwesomeIcon icon={faEllipsisH} className="song-row-icon"/>
                </td>
            </tr>
        );
    }
}
