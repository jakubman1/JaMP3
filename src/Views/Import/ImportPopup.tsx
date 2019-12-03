import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faFileAudio} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {ImportCreatePlaylist} from "./ImportCreatePlaylist";
import * as importFinished from "../../Controllers/importFinishedController";
const { ipcRenderer } = window.require('electron');
const {dialog} = window.require('electron').remote;

interface IProps {}
interface IState {
    files: string[];
    draggedOver: boolean;
}

export class ImportPopup extends React.Component<IProps, IState>{

    state: IState = {
        files: [],
        draggedOver: false
    };

    handleDrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let files: string[] = [];
        for (let file of event.dataTransfer.files) {
            files.push(file.path);
        }
        this.setState({files});
        return false;
    };

    handleDragOver = (e: any) => {
        this.setState({draggedOver: true});
        let event = e as Event;
        event.stopPropagation();
        event.preventDefault();
    };

    handleDragLeave = (e: any) => {
        this.setState({draggedOver: false});
        return false;
    };

    handleOverlayClick() {
        importFinished.doneImporting();
    }

    handleGlobalDragLeave() {
        importFinished.doneImporting();
        return false;
    }

    handleDropOutside(event: any) {
        event.preventDefault();
        importFinished.doneImporting();
        return false;
    }

    handleContentClick = (event: any) => {
        event.stopPropagation();
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if(this.state.files.length === 0) {
            return (
                <div className="popup-wrapper" onClick={this.handleOverlayClick} onDrop={this.handleDrop}
                     onDragOver={this.handleDragOver}
                     onDragLeave={this.handleDragLeave} onDragEnd={this.handleDragLeave}>
                    <div className="popup-content-wrapper" onClick={this.handleContentClick}
                         onDrop={this.handleDrop} onDragOver={this.handleDragOver}
                         onDragLeave={this.handleDragLeave} onDragEnd={this.handleDragLeave}>
                        <h1>Import</h1>
                        <div className={"import-area" + (this.state.draggedOver ? ' import-area-dragged-over' : '')}
                             onDrop={this.handleDrop} onDragOver={this.handleDragOver}
                             onDragLeave={this.handleDragLeave} onDragEnd={this.handleDragLeave}>
                            <FontAwesomeIcon className="big-icon" icon={faFileAudio} />
                            <p>Sem přetáhněte soubory</p>
                        </div>
                        <button className="btn btn-outline btn-big mt" onClick={this.handleOverlayClick}>Zrušit</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <ImportCreatePlaylist files={this.state.files} />
            )
        }

    }
}