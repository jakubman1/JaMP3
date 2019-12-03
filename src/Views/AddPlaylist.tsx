import React from 'react';
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
            dbRequests.getPlaylistSongsCount();
        }
        this.props.callback();
    };

    render() {
        return(
            <div className="popup-wrapper">
                <div className="popup-content-wrapper">
                    <h1>Přidat playlist</h1>
                    <p>Zadejte název playlistu</p>
                    <input className="round-input input-big margin-b" type="text"
                           placeholder="Název playlistu..."
                           value={this.state.inputValue}
                           onChange={newValue => this.changeInputValue(newValue)}/>
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.handleSubmit}>ok boomer</button>
                </div>
            </div>
        )
    }
}