import * as React from 'react';
import "./Settings.scss"

export class Settings extends React.Component {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="center-wrapper">
                <h1 className="settings-title">Nastavení</h1>

                <div className="settings-wrapper">
                    <div>Přehrát/pozastavit
                    <span className="subtext">Výchozí Alt + F6</span></div>
                    <div className="btn round-input">Alt + F6</div>

                    <div>Další skladba
                    <span className="subtext">Výchozí Alt + F7</span></div>
                    <div className="btn round-input">Alt + F7</div>

                    <div>Předchozí skladba
                    <span className="subtext">Výchozí Alt + F5</span></div>
                    <div className="btn round-input">Alt + F5</div>

                    <div>Zobrazit/skrýt mini přehrávač
                    <span className="subtext">Výchozí Alt + F8</span></div>
                    <div className="btn round-input">Alt + F8</div>

                    <div></div>
                    <div className="btn btn-outline">Uložit</div>
                </div>
            </div>
        );
    }
}