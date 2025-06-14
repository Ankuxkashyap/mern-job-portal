import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <nav>
      <div className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-20" />
        </Link>
        <button className='m-5 mr-7 cursor-pointer '>Login</button>
      </div>
    </nav>
  )
}

export default Header
