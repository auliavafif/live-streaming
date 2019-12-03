import React from "react"
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from '../components/connectionStatus';
import Publisher from '../components/Publisher';
import Subscriber from '../components/Subscriber';
import axios from 'axios';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            connected: false,
            text: '',
            publish: false,
            subscribe: false,
            chats: ['satu']
        };
        this.otSession = React.createRef();
        this.chatContainer = React.createRef()
        this.sessionEvents = {
            sessionConnected: () => {
                this.setState({ connected: true });
            },
            sessionDisconnected: () => {
                this.setState({ connected: false });
            },
            streamCreated: () => {
                this.setState({ subscribe: true });
            },
            streamDestroyed: () => {
                this.setState({ subscribe: false });
            }
        };
    }

    onError = (err) => {
        this.setState({ error: `Failed to connect: ${err.message}` });
    }

    sendChat = (e) => {
        var value = e.target.value;
        this.setState({ text: value })
    }

    fetchChats = () => {
        const self = this;
        axios.get('/.netlify/functions/chatRead')
        .then(res => {
            self.setState({chats: res.data.data})
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        const self = this;
        this.fetchChats();
        this.otSession.current.sessionHelper.session.on("signal:chat", function (event) {
            const updatedChats = self.state.chats.concat(event.data)
            self.setState({ chats: updatedChats })
        })

        if(window){
            this.scrollToBottom()
        }
    }

    togglePublish = () => {
        var publish = !this.state.publish
        this.setState({
            publish
        })
    }

    scrollToBottom = () => {
        this.chatContainer.current.scrollTop = this.chatContainer.current.scrollHeight
        // console.log('as', this.chatContainer.current.scrollHeight, this.chatContainer.current.scrollTop)
        // this.chatContainer.current.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate(prevState){
        if(prevState.chats!=this.state.chats){
            if(window){
                this.scrollToBottom()
            }
        }
    }

    keyPress = (e) => {
        const { text } = this.state;
        const { user } = this.props;
        var self = this;
        const data = {
            name: user.name,
            profilePicture: user.picture,
            text: text
        }
        if(text==''){
            return
        }
        if (e.keyCode == 13) {
            this.otSession.current.sessionHelper.session.signal(
                {
                    data: data,
                    type: "chat"
                },
                function (error) {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        axios.post('/.netlify/functions/chatCreate', { ...data })
                            .then(res => {
                                self.setState({text:''})
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
            );
        }
    }


    render() {
        const { chats, publish, subscribe, text } = this.state;
        const { user } = this.props;
        return (
            <>
            <div className="flex flex-wrap h-screen">
            <div className="w-20 bg-secondary text-center p-3">
                <img className="w-full inline" src="/img/logo-white.png" />
                <div className="mt-4 text-xs">
                    {this.state.connected ? <span className="bg-red-600 text-white inline-block px-1 rounded-sm">LIVE</span> : <span className="bg-white text-secondary inline-block px-1 rounded-sm">IDLE</span>}
                </div>
                <div className="mt-12 text-white">
                    <div className={publish ? "bg-red-600 hover:bg-red-700 px-4 py-2 cursor-pointer rounded" :"bg-success hover:bg-success-darken px-4 py-2 cursor-pointer rounded"} onClick={() => this.togglePublish()}>
                        <img src={"/img/icon-call.png"} />
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-warp">
            <div className="w-9/12 flex flex-col bg-gray-300">
            <div className="flex px-3 items-center h-12 w-full bg-white shadow-sm border-b border-solid">
                <span className="font-semibold">Live streaming room</span>
            </div>
            <div className="flex flex-wrap flex-grow ot-session">
            <OTSession
                apiKey={this.props.apiKey}
                sessionId={this.props.sessionId}
                token={this.props.token}
                eventHandlers={this.sessionEvents}
                onError={this.onError}
                ref={this.otSession}
            >
                {this.state.error ? <div id="error">{this.state.error}</div> : null}

                {publish ? <Publisher /> : null}
                {subscribe ? <OTStreams><Subscriber /></OTStreams> : null}
            </OTSession>
            </div>
                </div>
                <div className="w-3/12 flex flex-col h-screen">
                <div className="flex px-3 items-center h-12 w-full shadow-sm border-b border-solid justify-end">
        <span className="font-medium">{user.name}</span> <img className="w-8 rounded ml-2" src={user.picture} alt="profile"/><div onClick={() => this.props.logout()}className="ml-3 px-2 py-1 text-sm cursor-pointer border-2 hover:text-gray-800 hover:border-gray-800 text-gray-600 border-gray-600 border-solid rounded">Logout</div>
                </div>
                <div ref={this.chatContainer} className="border-l border-solid relative p-4 h-1 flex-grow overflow-scroll ">
                {chats.map((item, index) => {
                    return (
                <div key={index} className="flex mt-2">
                    <img className="w-8 h-8 rounded mr-2" src={item.profilePicture} />
                    <div className="bg-gray-200 p-2 rounded text-sm">
                        <div className="font-semibold leading-none">{item.name}</div>
                        <div>{item.text}</div>
                    </div>
                </div>
                    )
                })}
                </div>
                <div className="bg-gray-200 border-t border-solid p-1 w-full">

<input onChange={e => this.sendChat(e)} onKeyDown={e => this.keyPress(e)} value={text} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Type your chat" />
</div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

export default Room;

