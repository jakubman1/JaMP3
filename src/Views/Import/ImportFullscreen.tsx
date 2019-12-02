import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faFileAudio} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {ImportCreatePlaylist} from "./ImportCreatePlaylist";
const { ipcRenderer } = window.require('electron');

interface IProps {}
interface IState {
    files: string[];
    draggedOver: boolean;
}

export class ImportFullscreen extends React.Component<IProps, IState>{

    state: IState = {
      files: [],
      draggedOver: false
    };



   /* handleBackClick = () => {
        let history = useHistory();
        history.goBack();
    };*/



   handleFinishClick = () => {

   };

    handleBrowseClick = () => {
        // electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
    };


    handleDrop = (event: any) => {
        event.preventDefault();
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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if(this.state.files.length === 0) {
            return (
                <div className="fullscreen-wrapper">
                    <Link to="/home">
                        <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                    </Link>

                    <h1>Import</h1>
                    <div className={"import-area" + (this.state.draggedOver ? ' import-area-dragged-over' : '')}
                         onDrop={this.handleDrop} onDragOver={this.handleDragOver}
                         onDragLeave={this.handleDragLeave} onDragEnd={this.handleDragLeave}>
                        <FontAwesomeIcon className="big-icon" icon={faFileAudio} />
                        <p>Sem přetáhněte soubory</p>
                    </div>
                    <h2>NEBO</h2>
                    <Link to="/import/playlist" className="btn btn-big btn-outline">Procházet</Link>
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