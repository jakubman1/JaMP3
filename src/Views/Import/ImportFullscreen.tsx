import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faFileAudio} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
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


    handleDragStart = (event: any) => {
        event.preventDefault();
        ipcRenderer.send('ondragstart', '/path/to/item')
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="fullscreen-wrapper">
                <Link to="/home">
                    <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                </Link>

                <h1>Import</h1>
                <div className="import-area" onDragStart={this.handleDragStart}>
                    <FontAwesomeIcon className="big-icon" icon={faFileAudio} />
                    <p>Sem přetáhněte soubory</p>
                </div>
                <h2>NEBO</h2>
                <Link to="/import/playlist" className="btn btn-big btn-outline">Procházet</Link>
            </div>
        );
    }
}