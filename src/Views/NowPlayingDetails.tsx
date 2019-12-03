import * as React from "react";
import "./NowPlayingDetails.scss";

interface IProps {
    title: string;
    album: string;
    author: string;
}

export class NowPlayingDetails extends React.Component<IProps>{


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let scrollingTitle = this.props.title.length > 23 ? " song-title-scrolling" : '';

        let scrollingAuthor = (this.props.author && (this.props.author.length > 25)) ? " song-title-scrolling" : '';
        let scrollingAlbum = (this.props.album && (this.props.author.length > 25)) ? " song-title-scrolling" : '';
        return (
            <div className="now-playing-container">
                <h3 className={"song-title" + scrollingTitle}>{this.props.title}</h3>
                <p className={"song-info" + scrollingAuthor}>{this.props.author ? this.props.author : "Neznámý autor"}</p>
                <p className={"song-info" + scrollingAlbum}>{this.props.album ? this.props.album : "Neznámé album"}</p>
            </div>
        )
    }
}