import React from 'react';
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
    id: string;
    playlistName: string;
    callback: any;
}

export class RenamePlaylist extends React.Component<Props> {

    state = {
        inputValue: this.props.playlistName
    };

    changeInputValue = (newValue: any) => {
        this.setState({
            inputValue: newValue.target.value
        });
    };

    handleSubmit = () => {
        if (this.state.inputValue !== "") {
            dbRequests.renamePlaylist(this.props.id, this.state.inputValue);
            dbRequests.getAllPlaylists();
        }
        this.props.callback();
    };

    render() {
        return(
            <div className="popup-wrapper">
                <div className="popup-content-wrapper">
                    <h1>Přejmenovat playlist</h1>
                    <p>Zadejte nový název playlistu</p>
                    <input className="round-input input-big margin-b" type="text"
                           value={this.state.inputValue}
                           onChange={newValue => this.changeInputValue(newValue)}/>
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.handleSubmit}>ok boomer</button>
                </div>
            </div>
        )
    }
}