import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile, getOpentokToken } from "../utils/auth"
import Room from '../components/Room'
import '../styles/layout.scss'


class Live extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        if (!isAuthenticated()) {
            login()
            return <p>Redirecting to login...</p>
        }

        const user = getProfile()


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
                <Router>
                    <Room path="/live" apiKey={process.env.GATSBY_OPENTOK_KEY} sessionId={process.env.GATSBY_OPENTOK_SESSION_ID} token={getOpentokToken(user.email)} user={user} logout={e => {
                            logout()
                            e.preventDefault()
                        }}/>
                </Router>
            </>
        )
    }
}

export default Live
