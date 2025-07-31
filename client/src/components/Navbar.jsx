import React from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../store/auth';
import { UserNavigate } from './UserNavigate';

const Navbar = () => {

  const navigate = useNavigate();
  const user = useAuthStore((state)=>state.user);
  const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);
  const [userPanel, setuserPanel] = useState(false);

  const handeBlur = ()=>{
    setTimeout(()=>{
      setuserPanel(false)
    }, 200);
  } 
  return (
    <nav className=' flex flex-row ' >
        <img src={logo} alt="Logo" className="w-35 h-25 cursor-pointer p-4" onClick={()=>{navigate('/')}} />

      { user ? 
        <Link className='rounded-full border flex items-center justify-center border-gray-600 h-10 w-10 bg-gray-400 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-white/40 cursor-pointer absolute md:right-15 right-10 top-5 '  
        onClick={()=>{setuserPanel(prev => !prev)}}
        onBlur={handeBlur}
        >
          👤 
        </Link> :
        <button className ='rounded-full border border-gray-600 h-10 w-20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-white/40 cursor-pointer absolute md:right-15 right-10 top-5 '
        onClick={()=>{navigate('/login')}}
        >LogIn
        </button> 
      }

      <div>
      {
        userPanel ? <UserNavigate/> : null
      }
      </div>

        

    </nav>
  )
}

export default Navbar