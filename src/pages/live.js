import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile, getOpentokToken } from "../utils/auth"
import '../styles/layout.scss'
import Loadable from "@loadable/component"
const Room = Loadable(() => import("../components/Room"))

class Live extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){
        if (typeof window === 'undefined') {
            return;
        }
        else{
            this.setState({isClient:true})
        }

    }

    renderRoom = () => {
        if(this.state.isClient){
        const user = getProfile()

        return(
            <Router>
                <Room path="/live" apiKey={process.env.GATSBY_OPENTOK_KEY} sessionId={process.env.GATSBY_OPENTOK_SESSION_ID} token={getOpentokToken(user.email)} user={user} logout={e => {
                    logout()
                    e.preventDefault()
                }}/>
             </Router>);
        }
    }


    render(){
        if (!isAuthenticated()) {
            login()
            return(
                <div className="h-screen w-full flex items-center fixed block top-0 left-0 bg-white opacity-75 z-50">
                    <img className="mx-auto my-0 " src="/img/loading.gif" alt="loading" />
                </div>
            )
        }


        return (
            <>
                {this.renderRoom()}
            </>
        )
    }
}

export default Live
