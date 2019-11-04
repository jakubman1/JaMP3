import * as React from 'react'
import {Link} from 'react-router-dom';
import './Welcome.scss';
import { useHistory } from "react-router-dom";

export const Welcome: React.FunctionComponent = () => {
    return (
        <div className="fullscreen-wrapper">
            <div className="row align-center">
                <h1 className="logo text-center take-full-row logo-big">JaMP3</h1>
                <h2 className="fancy-subheading text-center">Just Another Music Player</h2>
            </div>
            <div className="row align-center">

            </div>
            <div className="row align-center">
                <Link to="/home" className="btn btn-big btn-outline text-center">Pokračovat</Link>
            </div>
        </div>
    );
};
