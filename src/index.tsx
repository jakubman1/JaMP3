import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import JaMP3 from './JaMP3';
import * as serviceWorker from './serviceWorker';
import './Controllers/dbRequests';

ReactDOM.render(<JaMP3 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
