import React from "react"
import { handleAuthentication } from "../utils/auth"

const Callback = () => {
  handleAuthentication()
  return(
    <div className="h-screen w-full flex items-center fixed block top-0 left-0 bg-white opacity-75 z-50">
        <img className="mx-auto my-0 " src="/img/loading.gif" alt="loading" />
    </div>
  )
}

export default Callback