import * as React from 'react';
import "./Settings.scss"
import {getShortcuts, setShortcuts} from "../Controllers/KeyboardShortcutController";
import {Link} from "react-router-dom";

interface IPRops {}

export class Settings extends React.Component<IPRops> {

    state = {
        togglePlay: "",
        skip: "",
        prev: "",
        valid: true
    };

    constructor(props: IPRops) {
        super(props);
        getShortcuts().then((data: {TogglePause: string, Prev: string, Skip: string}) => {
            this.setState({
                togglePlay: data.TogglePause,
                skip: data.Skip,
                prev: data.Prev
            })
        })
    }

    validateShortcut = (shortcut: string) => {
      return /^((CommandOrControl|Alt|Super|Shift)[+])+.|F[0-9]|F1[0-2]|Tab$/.test(shortcut);
    };

    handleSaveClick = () => {
        if(!this.validateShortcut(this.state.togglePlay)) {
            alert(this.state.togglePlay + ' není platná klávesová zkratka :(');
            return;
        }
        if(!this.validateShortcut(this.state.prev)) {
            alert(this.state.prev + ' není platná klávesová zkratka :(');
            return;
        }
        if(!this.validateShortcut(this.state.skip)) {
            alert(this.state.skip + ' není platná klávesová zkratka :(');
            return;
        }
        setShortcuts(this.state.togglePlay, this.state.prev, this.state.skip);
    };

    handleToggleChange = (e: any) => {
        if(this.validateShortcut(e.target.value)) {
            this.setState({togglePlay: e.target.value, valid: true})
        }
        else {
            this.setState({togglePlay: e.target.value})
        }

    };

    handlePrevChange = (e: any) => {
        this.setState({prev: e.target.value})
    };

    handleSkipChange = (e: any) => {
        this.setState({skip: e.target.value})
    };


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let submitBtn = null;
        if(this.state.valid) {
            submitBtn = (
                <Link to="/home" className="btn btn-outline" onClick={this.handleSaveClick}>Uložit</Link>
            );
        }
        return (
            <div className="center-wrapper">
                <h1 className="settings-title">Nastavení</h1>

                <div className="settings-wrapper">
                    <div>Přehrát/pozastavit
                        <span className="subtext">Výchozí Alt+F6</span>
                    </div>
                    <div>
                        <input className="btn round-input" value={this.state.togglePlay} onChange={this.handleToggleChange} />
                    </div>

                    <div>Další skladba
                        <span className="subtext">Výchozí Alt+F7</span>
                    </div>
                    <div>
                        <input className="btn round-input" value={this.state.skip} onChange={this.handleSkipChange} />
                    </div>

                    <div>Předchozí skladba
                        <span className="subtext">Výchozí Alt+F5</span>
                    </div>
                    <div>
                        <input className="btn round-input" value={this.state.prev} onChange={this.handlePrevChange} />
                    </div>
                    <div>
                        <p className="error-text">Klávesy zkratek musejí být oddělené znakem + a bez mezer. Pro CTRL použijte
                        'CommandOrControl', pro klávesu windows použijte 'Super'.</p>
                    </div>
                    {submitBtn}
                </div>
            </div>
        );
    }
}