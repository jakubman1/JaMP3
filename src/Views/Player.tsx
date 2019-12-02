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
import {NowPlayingDetails} from "./NowPlayingDetails";
import * as dbRequests from "../Controllers/dbRequests";

interface Props {
}

interface State {
    isPlaying: boolean;
    songPath: string;
    volume: number;
    songCurPosition: number;
    songDuration: number;

    songsArray: string[];
    songsArrayIndex: number;
}

export class Player extends React.Component<Props, State> {

    _audio = new Audio(undefined);

    constructor(Props: any) {
        super(Props);
        this.state = {
            isPlaying: false,
            songPath: "",
            volume: 0.5,
            songCurPosition: 0,
            songDuration: 0,

            songsArray: [],
            songsArrayIndex: -1
        };

        dbRequests.emitter.on('getSongsInActivePlaylist', (data: any) => this.loadSongs(data));
    }

    loadSongs = (data: any) => {
        console.log(data);
        this.setState({
            isPlaying: true,
            songPath: data.array[data.index].path,
            volume: this.state.volume,
            songCurPosition: 0,
            songDuration: 0,

            songsArray: data.array,
            songsArrayIndex: data.index
        },() => {
            this._audio.src = this.state.songPath;
            this._audio.load();
            this.playSong();
        });
    };

    playSong = () => {
        this.setState({
            isPlaying: true
        }, () => {
            console.log(this.state.songPath + this.state.isPlaying);
            this._audio.addEventListener("timeupdate", this.updateSongPosition);
            this._audio.play()
        });
    };

    pauseSong = () => {
        this.setState({
            isPlaying: false
        }, () => {
            this._audio.pause()
        });
    };

    prevSong = () => {
        let newIndex = ((this.state.songsArrayIndex - 1) < 0) ? (this.state.songsArray.length) : (this.state.songsArrayIndex - 1);
        this.setState({
            // @ts-ignore
            songPath: this.state.songsArray[newIndex].path,
            songsArrayIndex: newIndex,
            songCurPosition: 0,
            songDuration: 0,
        }, () => {
            this._audio.src = this.state.songPath;
            this._audio.load();
            this.playSong();
        });
    };

    nextSong = () => {
        let newIndex = (this.state.songsArrayIndex + 1) % this.state.songsArray.length;
        this.setState({
            // @ts-ignore
            songPath: this.state.songsArray[newIndex].path,
            songsArrayIndex: newIndex,
            songCurPosition: 0,
            songDuration: 0,
        }, () => {
            this._audio.src = this.state.songPath;
            this._audio.load();
            this.playSong();
        });
    };

    changeVolume = (newVal: number) => {
        this.setState({
            volume: newVal / 100
        }, () => {
            this._audio.volume = this.state.volume;
        });
    };

    changeSongPosition = (newVal: number) => {
        this.setState({
            songCurPosition: newVal
        }, () => {
            this._audio.currentTime = this.state.songCurPosition;
        });
    };

    updateSongPosition = () => {
        this.setState({
            songCurPosition: this._audio.currentTime,
            songDuration: this._audio.duration
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
                    <div className="add-to-favourites">
                        <FontAwesomeIcon icon={faStarO} className="add-to-favourites-icon"/>
                        Přidat do oblíbených
                    </div>
                    <div className="player-control-icon-container">
                        <FontAwesomeIcon onClick={this.prevSong} className="player-control-icon" icon={faFastBackward}/>
                        <FontAwesomeIcon onClick={this.state.isPlaying ? this.pauseSong : this.playSong}
                                         className="player-control-icon icon-circle"
                                         icon={this.state.isPlaying ? faPause : faPlay}/>
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
                    <div className="time-slider-container">
                        <span className="time-slider-label">
                            {this.state.songCurPosition ? this.secondsToTime(Math.floor(this.state.songCurPosition)) : '--:--'}
                        </span>
                        <Slider className="time-slider" min={0} max={Math.floor(this.state.songDuration)} defaultValue={0}
                                step={1} value={this.state.songCurPosition} onChange={this.changeSongPosition}/>
                        <span className="time-slider-label">
                            {this.state.songDuration ?  this.secondsToTime(Math.floor(this.state.songDuration)) : '--:--'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}