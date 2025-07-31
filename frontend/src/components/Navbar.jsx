// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { FiArrowLeft } from 'react-icons/fi'

const Navbar = () => {
  // const [menuOpen, setMenuOpen] = useState(false)
  // const {token,logout} =useContext(AppContext);
  //  const navigate = useNavigate()


  return (
    <>
    <nav className="fixed w-full top-0 bg-gradient-to-br from-[#120f81]">
        
      <div className="max-w-7xl mx-auto px-4 py-3 flex  justify-start gap-8 text-center ">
     
         <h1 className="text-3xl font-bold text-white tracking-wide ">
          <span  className="text-6xl font-black bg-gradient-to-br from-black via-[#153db6] to-indigo-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300"
          >AI</span>VirtualAssistant
        </h1>
        {/* {/* Hamburger Icon */}
        {/* <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button> */}
        {/* Desktop Menu */}
        {/* <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">Home</Link>
          </li>
          <li>
            <Link to="/features" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">Features</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">Contact</Link>
          </li>
        </ul> */}
        {/* Desktop Auth Buttons */}
        {/* <div className="hidden md:flex space-x-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded bg-white text-indigo-600 font-semibold hover:bg-yellow-300 hover:text-indigo-900 transition-colors duration-200 shadow"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded bg-yellow-300 text-indigo-900 font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200 shadow"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              className="px-4 py-1 rounded bg-white text-pink-600 font-semibold hover:bg-yellow-300 hover:text-pink-900 transition-colors duration-200 shadow"
              // onClick={logout}
            >
              Logout
            </button>
          )}
        </div> */}
      </div>
      {/* Mobile Menu */}
      {/* {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-3">
            <li>
              <Link to="/" className="block text-white hover:text-yellow-300 font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/features" className="block text-white hover:text-yellow-300 font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Features</Link>
            </li>
            <li>
              <Link to="/about" className="block text-white hover:text-yellow-300 font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/contact" className="block text-white hover:text-yellow-300 font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
          <div className="flex flex-col space-y-2 mt-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 rounded bg-white text-indigo-600 font-semibold hover:bg-yellow-300 hover:text-indigo-900 transition-colors duration-200 shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 rounded bg-yellow-300 text-indigo-900 font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200 shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="px-4 py-1 rounded bg-white text-pink-600 font-semibold hover:bg-yellow-300 hover:text-pink-900 transition-colors duration-200 shadow"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}  */}
    </nav>
    </>
  )
}

export default Navbar