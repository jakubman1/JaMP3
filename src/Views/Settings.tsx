import * as React from 'react';
import "./Settings.scss"

export class Settings extends React.Component {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="center-wrapper">
                <h2>Nastavení</h2>

                <div className="settings-wrapper">
                    <div>Přehrát/pozastavit</div>
                    <div>Alt + F6</div>
                    <div>Další skladba</div>
                    <div>Alt + F5</div>
                    <div>Předchozí skladba</div>
                    <div>Alt + F7</div>
                    <div>Zobrazit/skrýt mini přehrávač</div>
                    <div>Alt + F8</div>
                    <div></div>
                    <div>Uložit</div>
                </div>
            </div>
        );
    }
}