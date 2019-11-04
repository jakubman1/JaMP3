import * as React from 'react';
import "./PlaylistList.scss"

interface Props {
    activePlaylist: string;
}

export class PlaylistList extends React.Component<Props> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="top-list-wrapper">
                <ul className="playlist-list">
                    <li>
                        <span className="playlist-list-name">Vse</span>
                        <span className="playlist-list-song-count">420 skladeb</span>
                    </li>
                    <li>
                        <span className="playlist-list-name">Vse</span>
                        <span className="playlist-list-song-count">420 skladeb</span>
                    </li>
                    <li className="playlist-list-name">Pridat playlist</li>
                </ul>

            </div>
        );
    }
}