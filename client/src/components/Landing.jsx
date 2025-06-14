import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import CompanyCarousel from './CompanyCarousel'

const Landing = () => {
  // Shared button styles
  const baseButton =
    'px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95'

  return (
    <>
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      {/* Title Section */}
      <section className="text-center">
       <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-6xl lg:text-8xl tracking-tighter py-4">
            Find Your Dream Job

          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src={logo}
              className="h-14 sm:h-24 lg:h-32"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      {/* Buttons Section */}
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <button
            className={`${baseButton} bg-blue-600 hover:bg-blue-900 focus:ring-blue-400`}
          >
            Find Jobs
          </button>
        </Link>

        <Link to="/post-job">
          <button
            className={`${baseButton} bg-red-600 hover:bg-red-900 focus:ring-red-400`}
          >
            Post a Job
          </button>
        </Link>
      </div>
    </main>
    <section className="mt-10">
      <h2 className="text-center text-2xl sm:text-4xl font-bold mb-6">
        Trusted by Top Companies
      </h2>
      <CompanyCarousel />
    </section>
   </> 
  )
}

export default Landing
