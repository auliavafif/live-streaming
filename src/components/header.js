import React from "react"
import { Link } from "gatsby"

export class Header extends React.Component {

  render() {

    return (
      <nav className="shadow bg-white z-50 w-full lg:px-24 px-5">
        <div className="flex items-center justify-between flex-wrap py-2 px-3 container mx-auto">
          <div className="flex items-center flex-shrink-0 mr-6">
            <Link to="/"><img src='/img/logo.png' alt="logo" /></Link>
          </div>
          <img className="md:hidden" src={"/img/logo-itb.png"} alt="logo itb" />
          <div className="w-full hidden flex-grow md:flex md:items-center md:w-auto">
            <div className="text-sm md:flex-grow">
              <Link to="/" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-8">
                Home
        </Link>
              <Link to="/rewards" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-8">
                Rewards
        </Link>
              <Link to="/leaderboard" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-8">
                Leaderboard
        </Link>
              <Link to="/team" className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-8">
                Team
        </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}


export default Header
