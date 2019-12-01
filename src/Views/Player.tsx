import * as React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./Player.scss"


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
            if(this.state.playing) {
                this._audio.pause();
            }
            this._audio.src = this.state.song;
            this._audio.load();
            if(this.state.playing) {
                this._audio.play();
            }
        });
    };

    toggleSong = () => {
        if(this.state.playing) {
            // pause
            this._audio.pause();
            this.setState({
                song: this.state.song,
                playing: !this.state.playing,
                volume: this.state.volume,
                curPosition: this.state.curPosition,
                duration: this.state.duration
            });
        }
        else {
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
            if(this.state.playing) {
                this._audio.pause();
            }
            this._audio.src = this.state.song;
            this._audio.load();
            if(this.state.playing) {
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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                <button onClick={this.prevSong}>Prev</button>
                <button onClick={this.toggleSong}>{this.state.playing ? "Pause": "Play"}</button>
                <button onClick={this.nextSong}>Next</button>
                <Slider className="slider" min={0} max={100} defaultValue={50} step={1} onChange={this.changeVolume}/>
                <label>{Math.floor(this.state.volume * 100)}%</label>
                <Slider className="slider" min={0} max={Math.floor(this.state.duration)} defaultValue={0} step={1} value={this.state.curPosition} onChange={this.changeSongPosition}/>
                <label>{this.state.curPosition ? Math.floor(this.state.curPosition) : 0}</label>
                <label> : </label>
                <label>{this.state.duration ? Math.floor(this.state.duration) : 0}</label>
            </div>
        );
    }
}