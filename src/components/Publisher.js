import React from 'react';
import { OTPublisher } from 'opentok-react';

class Publisher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            audio: true,
            video: true,
            videoSource: 'camera'
        };
    }
    setAudio = () => {
        const { audio } = this.state
        this.setState({ audio: !audio });
    }

    setVideo = () => {
        const { video } = this.state
        this.setState({ video: !video });
    }

    changeVideoSource = (videoSource) => {
        (this.state.videoSource !== 'camera') ? this.setState({ videoSource: 'camera' }) : this.setState({ videoSource: 'screen' })
    }

    onError = (err) => {
        this.setState({ error: `Failed to publish: ${err.message}` });
    }

    render() {
        const { audio, video, videoSource } = this.state
        return (
            <div className="h-full">
              {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <div className="h-full flex ot-publisher relative">
                <OTPublisher
                    properties={{
                        publishAudio: this.state.audio,
                        publishVideo: this.state.video,
                        videoSource: this.state.videoSource === 'screen' ? 'screen' : undefined
                    }}
                    onError={this.onError}
                />
                 <div className="absolute w-full text-white z-10 h-auto">
                     <div className="absolute bottom-0 flex p-4">
                        {/* <div className="p-2 self-center m-2 bg-gray-500" onClick={this.changeVideoSource}>{videoSource!='camera' ? <img src="icon-video" : 'vs non'}</div> */}
                        <div className="p-2 self-center mr-1 bg-controller rounded-full cursor-pointer" onClick={this.setVideo}><img className="w-4" src={video ? '/img/icon-no-video.png' : '/img/icon-video.png'} /></div>
                        <div className="p-2 self-center bg-controller rounded-full cursor-pointer" onClick={this.setAudio}><img className="w-4" src={audio ? '/img/icon-no-mic.png' : '/img/icon-mic.png'} /></div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
export default Publisher;
