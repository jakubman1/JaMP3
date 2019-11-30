import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'

export class ImportFullscreen extends React.Component{


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="fullscreen-wrapper">
                <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                <h1>Import</h1>
                <div className="import-area">
                    <p>Sem přetáhněte soubory</p>
                </div>
                <h2>NEBO</h2>
                <button className="btn btn-big btn-outline">Procházet</button>
            </div>
        );
    }
}