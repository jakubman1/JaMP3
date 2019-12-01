import React from 'react';
import {Playlist} from "../Shared/Playlist";
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
    callback: any;
}

export class AddPlaylist extends React.Component<Props> {

    state = {
      inputValue: ""
    };

    changeInputValue = (newValue: any) => {
        this.setState({
            inputValue: newValue.target.value
        });
    };

    handleSubmit = () => {
        if (this.state.inputValue !== "") {
            dbRequests.createNewPlaylist(this.state.inputValue);
            dbRequests.getAllPlaylists();
        }
        this.props.callback();
    };

    render() {
        return(
            <div className="popup-wrapper">
                <div className="popup-content-wrapper">
                    <input type="text" value={this.state.inputValue} onChange={newValue => this.changeInputValue(newValue)}/>
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.handleSubmit}>ok boomer</button>
                </div>
            </div>
        )
    }
}