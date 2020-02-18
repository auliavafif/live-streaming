import auth0 from 'auth0-js'
import { navigateTo } from 'gatsby-link'

const AUTH0_DOMAIN = process.env.GATSBY_AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.GATSBY_AUTH0_CLIENTID
const AUTH0_URL_CALLBACK = process.env.GATSBY_AUTH0_URL+'/callback'
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
        navigateTo('/')
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
      navigateTo('/')
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
    navigateTo('/')
  }

  isAuthenticated() {
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
        return 'T1==cGFydG5lcl9pZD00NjQ3MDQzMiZzaWc9YzY3MGQ4ODQ5MDZkZDIwMGY0OThiZjhmMTBjNGRlNGExN2M0ZDc5OTpzZXNzaW9uX2lkPTFfTVg0ME5qUTNNRFF6TW41LU1UVTNOVEkyTVRRd01UWTVOSDUyU2pKaFNYSjViWEJvVW5BMVQycHRaR050ZVdzd1YyUi1mZyZjcmVhdGVfdGltZT0xNTc1MjYxNzEwJm5vbmNlPTAuNzI4NjYyNzI4NTYwOTg5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1Nzc4NTM3MDkmY29ubmVjdGlvbl9kYXRhPSU3QmVtYWlsJTNBJ2F1bGlhdmFmaWYlNDBnbWFpbC5jb20nJTdEJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
    else{
        return 'T1==cGFydG5lcl9pZD00NjQ3MDQzMiZzaWc9YmViNDdkMzg4NzU1NzU2YTNkNmY1ZTI2MTJiYTQzOTFiZjY0N2ExZTpzZXNzaW9uX2lkPTFfTVg0ME5qUTNNRFF6TW41LU1UVTNOVEkyTVRRd01UWTVOSDUyU2pKaFNYSjViWEJvVW5BMVQycHRaR050ZVdzd1YyUi1mZyZjcmVhdGVfdGltZT0xNTc1MjYxOTQyJm5vbmNlPTAuNzQ1OTYzMjA2NDQ2MzA4MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTc3ODUzOTQxJmNvbm5lY3Rpb25fZGF0YT0lN0JlbWFpbCUzQSd0ZXN0dXNlcjIxMjIwMTklNDBnbWFpbC5jb20nJTdEJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
}