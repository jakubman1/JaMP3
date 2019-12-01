import * as React from 'react'
import {Link} from 'react-router-dom';
import './Welcome.scss';
import { useHistory } from "react-router-dom";
import importInstructions from "./import-instructions.jpg";

export const Welcome: React.FunctionComponent = () => {
    let history = useHistory();
    function handleNextClick() {
        localStorage.setItem('welcome', "yes");
        history.push("/home");
    }
    function checkHistory() {
        if(localStorage.getItem('welcome') === "yes") {
            history.push("/home");
        }
    }
    //checkHistory();
    return (
        <div className="fullscreen-wrapper">
            <div className="row align-center">
                <h1 className="logo text-center take-full-row logo-big">JaMP3</h1>
                <h2 className="fancy-subheading text-center">Just Another Music Player</h2>
            </div>
            <div className="row align-center">
                <div className="welcome-images">
                    <img src={importInstructions} alt="import instructions"/>
                    <img src={importInstructions} alt="import instructions"/>
                    <img src={importInstructions} alt="import instructions"/>
                    <div>Klikněte na tlačítko importu v pravém horním rohu aplikace.</div>
                    <div>Přetáhněte soubor(y) nebo klikněte na tlačítko "Procházet" pro výběr hudby.</div>
                    <div>Vyberte si playlist, do kterého chcete novou hudbu přidat a klikněte na tlačítko "Importovat."</div>
                </div>
            </div>
            <div className="row align-center">
                <a onClick={handleNextClick} className="btn btn-big btn-outline text-center">Pokračovat</a>
            </div>
        </div>
    );
};
