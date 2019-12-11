import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
    ? new auth0.WebAuth({
        domain: process.env.GATSBY_AUTH0_DOMAIN,
        clientID: process.env.GATSBY_AUTH0_CLIENTID,
        redirectUri: process.env.GATSBY_AUTH0_URL+'/callback',
        responseType: "token id_token",
        scope: "openid profile email",
    })
    : {}

const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }


  if (authResult && authResult.accessToken && authResult.idToken) {
    console.log('3')
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/live")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const silentAuth = callback => {
    if (!isAuthenticated()) return callback()
    auth.checkSession({}, setSession(callback))
  }

  export const logout = () => {
    localStorage.setItem("isLoggedIn", false)
    auth.logout({
        returnTo: process.env.GATSBY_AUTH0_URL
        })
  }

export const getOpentokToken = email => {
    if(email=='auliavafif@gmail.com'){
        return 'T1==cGFydG5lcl9pZD00NjQ3MDQzMiZzaWc9YzY3MGQ4ODQ5MDZkZDIwMGY0OThiZjhmMTBjNGRlNGExN2M0ZDc5OTpzZXNzaW9uX2lkPTFfTVg0ME5qUTNNRFF6TW41LU1UVTNOVEkyTVRRd01UWTVOSDUyU2pKaFNYSjViWEJvVW5BMVQycHRaR050ZVdzd1YyUi1mZyZjcmVhdGVfdGltZT0xNTc1MjYxNzEwJm5vbmNlPTAuNzI4NjYyNzI4NTYwOTg5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1Nzc4NTM3MDkmY29ubmVjdGlvbl9kYXRhPSU3QmVtYWlsJTNBJ2F1bGlhdmFmaWYlNDBnbWFpbC5jb20nJTdEJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
    else{
        return 'T1==cGFydG5lcl9pZD00NjQ3MDQzMiZzaWc9YmViNDdkMzg4NzU1NzU2YTNkNmY1ZTI2MTJiYTQzOTFiZjY0N2ExZTpzZXNzaW9uX2lkPTFfTVg0ME5qUTNNRFF6TW41LU1UVTNOVEkyTVRRd01UWTVOSDUyU2pKaFNYSjViWEJvVW5BMVQycHRaR050ZVdzd1YyUi1mZyZjcmVhdGVfdGltZT0xNTc1MjYxOTQyJm5vbmNlPTAuNzQ1OTYzMjA2NDQ2MzA4MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTc3ODUzOTQxJmNvbm5lY3Rpb25fZGF0YT0lN0JlbWFpbCUzQSd0ZXN0dXNlcjIxMjIwMTklNDBnbWFpbC5jb20nJTdEJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
}