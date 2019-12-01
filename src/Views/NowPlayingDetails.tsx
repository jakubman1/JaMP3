import * as React from "react";
import "./NowPlayingDetails.scss";

export class NowPlayingDetails extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="now-playing-container">
                <p>Eva a vašek už jedou</p>
            </div>
        )
    }
}