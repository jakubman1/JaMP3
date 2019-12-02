import * as React from "react";
import "./NowPlayingDetails.scss";

interface IProps {
    title: string;
    album: string;
    author: string;
}

export class NowPlayingDetails extends React.Component<IProps>{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="now-playing-container">
                <h3 className="song-title">{this.props.title}</h3>
                <p className="song-info">{this.props.author}</p>
                <p className="song-info">{this.props.album}</p>
            </div>
        )
    }
}