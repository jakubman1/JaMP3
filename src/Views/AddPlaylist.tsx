import React from 'react';
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
    callback: any;
}

export class AddPlaylist extends React.Component<Props> {

    state = {
      inputValue: ""
    };

    playlistInput: HTMLInputElement | null;

    componentDidMount(): void {
        if(this.playlistInput !== null) {
            this.playlistInput.focus();
        }
    }

    changeInputValue = (newValue: any) => {
        this.setState({
            inputValue: newValue.target.value
        });
    };

    handleKeyPress = (e: any) => {
        if(e.key === 'Enter') {
            this.handleSubmit()
        }
        else if(e.key === 'Escape') {
            this.closeWindow();
        }
    };

    handleSubmit = () => {
        if (this.state.inputValue !== "") {
            dbRequests.createNewPlaylist(this.state.inputValue);
            dbRequests.getPlaylistSongsCount();
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

    render() {
        return(
            <div className="popup-wrapper" onClick={this.closeWindow}>
                <div className="popup-content-wrapper" onClick={this.handleInsideClick}>
                    <h1>Přidat playlist</h1>
                    <p>Zadejte název playlistu</p>
                    <input className="round-input input-big margin-b" type="text"
                           placeholder="Název playlistu..."
                           ref={(input) => { this.playlistInput = input; }}
                           value={this.state.inputValue}
                           onKeyPress={this.handleKeyPress}
                           onChange={newValue => this.changeInputValue(newValue)}
                    />
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.handleSubmit}>Potvrdit</button>
                </div>
            </div>
        )
    }
}