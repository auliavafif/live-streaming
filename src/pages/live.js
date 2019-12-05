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
        this.setState({isClient:true})

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
            return <p>Redirecting to login...</p>
        }


        return (
            <>
                {/* <nav>
                    <Link to="/live">Room</Link>{" "}
                    <a
                        href="#logout"
                        onClick={e => {
                            logout()
                            e.preventDefault()
                        }}
                    >
                        Log Out
                </a>
                </nav> */}

                    {this.renderRoom()}
            </>
        )
    }
}

export default Live
