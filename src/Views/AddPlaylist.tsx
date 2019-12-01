import React from 'react';
import {Playlist} from "../Shared/Playlist";

interface Props {
   okCB: any;
   nameCB: any;
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

    okBTN = () => {
        this.props.nameCB(this.state.inputValue);
        this.props.okCB();
    };

    render() {
        return(
            <div className="popup-wrapper">
                <div className="popup-content-wrapper">
                    <input type="text" value={this.state.inputValue} onChange={newValue => this.changeInputValue(newValue)}/>
                    <br/>
                    <button className="btn btn-big btn-outline" onClick={this.okBTN}>ok boomer</button>
                </div>
            </div>
        )
    }
}