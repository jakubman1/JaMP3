import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faFileAudio} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import * as dbRequest from "../../Controllers/dbRequests";
const { ipcRenderer } = window.require('electron');

interface IProps {}
interface IState {
    importAreaRef: any
}

export class ImportFullscreen extends React.Component<IProps, IState>{


   /* handleBackClick = () => {
        let history = useHistory();
        history.goBack();
    };*/

    handleBrowseClick = () => {
        // electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
    };


    handleDrop = (event: any) => {
        event.preventDefault();
        let files: string[] = [];
        for (let file of event.dataTransfer.files) {
            files.push(file.path);
        }
        //console.log(files);
        dbRequest.importMP3s(files);
        dbRequest.getAllSongsCount();
        return false;
    };

    handleDragOver = (e: any) => {
        let event = e as Event;
        event.stopPropagation();
        event.preventDefault();
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="fullscreen-wrapper">
                <Link to="/home">
                    <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                </Link>

                <h1>Import</h1>
                <div className="import-area" onDrop={this.handleDrop} onDragOver={this.handleDragOver}
                     onDragLeave={() => {return false}} onDragEnd={() => {return false}}>
                    <FontAwesomeIcon className="big-icon" icon={faFileAudio} />
                    <p>Sem přetáhněte soubory</p>
                </div>
                <h2>NEBO</h2>
                <Link to="/import/playlist" className="btn btn-big btn-outline">Procházet</Link>
            </div>
        );
    }
}