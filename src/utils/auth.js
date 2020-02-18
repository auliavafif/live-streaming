import auth0 from 'auth0-js'
import { navigate } from 'gatsby'

const AUTH0_DOMAIN = process.env.GATSBY_AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.GATSBY_AUTH0_CLIENTID
const AUTH0_URL_CALLBACK = process.env.GATSBY_AUTH0_URL+'/callback'
const OPENTOK_TOKEN_FIRST = process.env.GATSBY_OPENTOK_TOKEN_FIRST
const OPENTOK_TOKEN_SECOND = process.env.GATSBY_OPENTOK_TOKEN_SECOND
const isBrowser = typeof window !== "undefined"

class Auth {
  accessToken
  idToken
  expiresAt
  userProfile

  auth0 = isBrowser ? new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_URL_CALLBACK,
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  }) : {}

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
  }

  login() {
    if (!isBrowser) {
      return;
    }

    this.auth0.authorize()
  }

  handleAuthentication() {
    if (!isBrowser) {
          return;
        }

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        navigate('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt

    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile
      }
      // navigateTo to the home route
      navigate('/live')
    })
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0
    this.userProfile = null

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    // navigateTo to the home route
    navigate('/')
  }

  isAuthenticated() {
    if (!isBrowser) {
      return;
    }
    // if(localStorage.getItem("isLoggedIn") === "true"){
    //   return true
    // }
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }

  getUser() {
    return this.userProfile
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name
    }
  }
}

const auth = new Auth()
export default auth

export const getOpentokToken = email => {
    if(email=='auliavafif@gmail.com'){
        return OPENTOK_TOKEN_FIRST
    }
    else{
        return OPENTOK_TOKEN_SECOND
    }
}