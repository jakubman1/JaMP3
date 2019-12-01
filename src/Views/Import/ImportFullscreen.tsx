import React, {RefObject} from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {Link, useHistory} from "react-router-dom";

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

    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="fullscreen-wrapper">
                <Link to="/home">
                    <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                </Link>

                <h1>Import</h1>
                <div className="import-area" onDragStart={this.handleDragStart}>
                    <p>Sem přetáhněte soubory</p>
                </div>
                <h2>NEBO</h2>
                <a className="btn btn-big btn-outline">Procházet</a>
            </div>
        );
    }
}