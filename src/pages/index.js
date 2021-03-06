import React from "react"
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"
import '../styles/layout.scss'
import auth from '../utils/auth'

const IndexPage = () => {
  if (!auth.isAuthenticated()) {
    return(
      <>
        <SEO title="Home" />
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <img className="inline-block" src="/img/logo.png" alt="logo"/>
            <div className="text-lg mt-4 mb-6">Welcome to my live streaming room.<br /> I built this live streaming room using GatsbyJs, Netlify, Opentok, Atlas, and Auth0. <br /> Please log in using credential that I gave to you. 😄</div>
            <Link to="/live" className="p-4 bg-primary hover:bg-primary-darken text-white rounded">Go to Room</Link>
          </div>
        </div>
      </>
    )
  }
  else{
    return navigate('/live')
  }
}

export default IndexPage
