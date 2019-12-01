import React from "react";
import "./ImportFullscreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'

interface IProps {}
interface IState {
    importAreaRef: any
}

export class ImportFullscreen extends React.Component<IProps, IState>{

    state: IState;
    constructor(props: IProps) {
        super(props);
        this.state.importAreaRef = React.createRef();
    }


    onFilesAdded = () => {

    };

    handleBrowseClick = () => {
        // electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
    };

    componentDidMount(): void {
        this.refs.importArea;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="fullscreen-wrapper">
                <FontAwesomeIcon className="go-back" icon={faChevronCircleLeft} />
                <h1>Import</h1>
                <div className="import-area" ref="importArea">
                    <p>Sem přetáhněte soubory</p>
                </div>
                <h2>NEBO</h2>
                <a className="btn btn-big btn-outline">Procházet</a>
            </div>
        );
    }
}