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

    handleInsideClick = (e:any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    closeWindow = () => {
        this.props.callback();
    };

    handleKeyPress = (e: any) => {
        if(e.key === 'Enter') {
            this.handleSubmit()
        }
        else if(e.key === 'Escape') {
            this.closeWindow();
        }
    };

    render() {
        return(
            <div className="popup-wrapper" onClick={this.closeWindow}>
                <div className="popup-content-wrapper" onClick={this.handleInsideClick}>
                    <h1>Přejmenovat playlist</h1>
                    <p>Zadejte nový název playlistu</p>
                    <input className="round-input input-big margin-b" type="text"
                           value={this.state.inputValue}
                           onChange={newValue => this.changeInputValue(newValue)}
                           onKeyPress={this.handleKeyPress}
                    />
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.handleSubmit}>Potvrdit</button>
                </div>
            </div>
        )
    }
}