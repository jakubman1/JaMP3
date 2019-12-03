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
        toggleValid: true,
        prevValid: true,
        skipValid: true
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
      return /^((CommandOrControl|Alt|Super|Shift)[+])+((.|F[0-9]|F1[0-2]|Tab)|(.|F[0-9]|F1[0-2]|Tab)[+]+)$/.test(shortcut);
    };

    handleSaveClick = () => {
        if(!this.validateShortcut(this.state.togglePlay)) {
            console.log(this.state.togglePlay + ' není platná klávesová zkratka :(');
        }
        else if(!this.validateShortcut(this.state.prev)) {
            console.log(this.state.prev + ' není platná klávesová zkratka :(');
        }
        else if(!this.validateShortcut(this.state.skip)) {
            console.log(this.state.skip + ' není platná klávesová zkratka :(');
        }
        else {
            setShortcuts(this.state.togglePlay, this.state.prev, this.state.skip);
        }

    };

    handleToggleChange = (e: any) => {
        if(this.validateShortcut(e.target.value)) {
            this.setState({toggleValid: true})
        }
        else {
            this.setState({toggleValid: false})
        }
        this.setState({togglePlay: e.target.value});

    };

    handlePrevChange = (e: any) => {
        if(this.validateShortcut(e.target.value)) {
            this.setState({prevValid: true})
        }
        else {
            this.setState({prevValid: false})
        }
        this.setState({prev: e.target.value});
    };

    handleSkipChange = (e: any) => {
        if (this.validateShortcut(e.target.value)) {
            this.setState({skipValid: true})
        } else {
            this.setState({skipValid: false})
        }
        this.setState({skip: e.target.value});
    };

    handleResetClick = () => {
        this.setState({
            togglePlay: "Alt+F6",
            skip: "Alt+F7",
            prev: "Alt+F5",
            toggleValid: true,
            prevValid: true,
            skipValid: true
        });
    };


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let submitBtn = (
            <button className="btn btn-outline" onClick={this.handleSaveClick}>Neplatné zkratky</button>
        );
        if(this.state.toggleValid && this.state.prevValid && this.state.skipValid) {
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
                        <input type="text"
                               className={this.state.toggleValid ? "btn round-input" : "btn round-input error-input"}
                               value={this.state.togglePlay} onChange={this.handleToggleChange} />
                    </div>

                    <div>Další skladba
                        <span className="subtext">Výchozí Alt+F7</span>
                    </div>
                    <div>
                        <input type="text" className={this.state.skipValid ? "btn round-input" : "btn round-input error-input"}
                               value={this.state.skip} onChange={this.handleSkipChange} />
                    </div>

                    <div>Předchozí skladba
                        <span className="subtext">Výchozí Alt+F5</span>
                    </div>
                    <div>
                        <input type="text" className={this.state.prevValid ? "btn round-input" : "btn round-input error-input"}
                               value={this.state.prev} onChange={this.handlePrevChange} />
                    </div>
                    <div>
                        <button className="btn btn-outline" onClick={this.handleResetClick}>Obnovit původní nastavení</button>
                    </div>
                    {submitBtn}
                    <p>Klávesy zkratek musejí být oddělené znakem + a bez mezer. Pro CTRL použijte
                        'CommandOrControl', pro klávesu windows použijte 'Super'.</p>
                </div>
            </div>
        );
    }
}