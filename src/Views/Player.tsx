import * as React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./Player.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faFastForward,
    faFastBackward,
    faPause,
    faPlay,
    faVolumeUp,
    faVolumeDown,
    faVolumeMute,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarO} from '@fortawesome/free-regular-svg-icons'
import {Link} from "react-router-dom";
import {NowPlayingDetails} from "./NowPlayingDetails";


export class Player extends React.Component {
    state = {
        song: "file:///C:/Users/Akhady/Downloads/mp3/Modern%20Revolt%20-%20LOCA%20[NCS%20Release].mp3",
        playing: false,
        volume: 0.5,
        curPosition: 0,
        duration: 0
    };

    _audio = new Audio(undefined);

    prevSong = () => {
        this.setState({
            song: "file:///C:/Users/Akhady/Downloads/mp3/Modern%20Revolt%20-%20LOCA%20[NCS%20Release].mp3",
            playing: this.state.playing,
            volume: this.state.volume,
            curPosition: 0,
            duration: 0
        }, () => {
            if (this.state.playing) {
                this._audio.pause();
            }
            this._audio.src = this.state.song;
            this._audio.load();
            if (this.state.playing) {
                this._audio.play();
            }
        });
    };

    toggleSong = () => {
        if (this.state.playing) {
            // pause
            this._audio.pause();
            this.setState({
                song: this.state.song,
                playing: !this.state.playing,
                volume: this.state.volume,
                curPosition: this.state.curPosition,
                duration: this.state.duration
            });
        } else {
            // play
            this._audio.addEventListener("timeupdate", this.updateSongPosition);
            this._audio.play();
            this.setState({
                song: this.state.song,
                playing: !this.state.playing,
                volume: this.state.volume,
                curPosition: this.state.curPosition,
                duration: this.state.duration
            });
        }
    };

    nextSong = () => {
        this.setState({
            song: "file:///C:/Users/Akhady/Downloads/mp3/Culture%20Code%20-%20Fairytale%20(feat.%20Amanda%20Collis)%20[NCS%20Release].mp3",
            playing: this.state.playing,
            volume: this.state.volume,
            curPosition: 0,
            duration: 0
        }, () => {
            if (this.state.playing) {
                this._audio.pause();
            }
            this._audio.src = this.state.song;
            this._audio.load();
            if (this.state.playing) {
                this._audio.play();
            }
        });
    };

    changeVolume = (newVal: number) => {
        this.setState({
            song: this.state.song,
            playing: this.state.playing,
            volume: newVal / 100,
            curPosition: this.state.curPosition,
            duration: this.state.duration
        }, () => {
            this._audio.volume = this.state.volume;
        });
    };

    changeSongPosition = (newVal: number) => {
        this.setState({
            song: this.state.song,
            playing: this.state.playing,
            volume: this.state.volume,
            curPosition: newVal,
            duration: this.state.duration
        }, () => {
            this._audio.currentTime = this.state.curPosition;
        });
    };

    updateSongPosition = () => {
        this.setState({
            song: this.state.song,
            playing: this.state.playing,
            volume: this.state.volume,
            curPosition: this._audio.currentTime,
            duration: this._audio.duration
        });
    };

    secondsToTime = (seconds: number): string => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        let minStr = min.toString();
        let secStr = sec.toString();
        if (min < 10) {
            minStr = "0" + minStr;
        }
        if (sec < 10) {
            secStr = "0" + secStr
        }
        return minStr + ":" + secStr;
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let volumeIcon = faVolumeUp;
        if (this.state.volume === 0) {
            volumeIcon = faVolumeMute;
        } else if (this.state.volume < 0.5) {
            volumeIcon = faVolumeDown;
        }

        return (
            <div className="max-100">
                <NowPlayingDetails/>
                <div className="now-playing-bar-content">
                    <div className="player-control-icon-container">
                        <FontAwesomeIcon onClick={this.prevSong} className="player-control-icon" icon={faFastBackward}/>
                        <FontAwesomeIcon onClick={this.toggleSong}
                                         className="player-control-icon icon-circle"
                                         icon={this.state.playing ? faPause : faPlay}/>
                        <FontAwesomeIcon onClick={this.nextSong} className="player-control-icon" icon={faFastForward}/>
                    </div>
                    <div className="volume-control">
                        <div className="volume-icon-container">
                            <FontAwesomeIcon icon={volumeIcon}/>
                        </div>
                        <Slider className="volume-slider" min={0} max={100} defaultValue={50} step={1}
                                onChange={this.changeVolume}/>
                        <span className="margin-l">{Math.floor(this.state.volume * 100)}%</span>

                    </div>
                    <div className="add-to-favourites">
                        <FontAwesomeIcon icon={faStarO}/>
                        Přidat do oblíbených
                    </div>
                    <div className="time-slider-container">
                        <span className="time-slider-label">
                            {this.state.curPosition ? this.secondsToTime(Math.floor(this.state.curPosition)) : '--:--'}
                        </span>
                        <Slider className="time-slider" min={0} max={Math.floor(this.state.duration)} defaultValue={0}
                                step={1} value={this.state.curPosition} onChange={this.changeSongPosition}/>
                        <span className="time-slider-label">
                            {this.state.duration ?  this.secondsToTime(Math.floor(this.state.duration)) : '--:--'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}