import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LandingPage from './LandingPage'

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
        <Navbar />
        <LandingPage />
    </div>
      <Footer />
    </>
  )
}

export default Home