import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from "react-toastify"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Signup = () => {
  const { setToken ,userData,setUserData} = useContext(AppContext)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
 
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(userData)
    
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/signup', form,{withCredentials:true});
      if (data.success) {
        toast.success(data.message)
       
        setUserData(data)
        navigate('/customize')
        // navigate(0)
      } else {
        toast.error(data.message)
       
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  return (
    <div
      className=" w-full h-[100vh] flex items-center justify-center bg-[url(assets\authBg.png)] bg-no-repeat bg-center bg-cover ">


      <div className=" inset-0  bg-opacity-60 z-0"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/40 rounded-2xl shadow-2xl px-8 py-10 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Register to <span className="text-blue-400">Virtual Assistant</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your Name"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-blue-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                <FaEye/>
                ) : (
                <FaEyeSlash/>
                )}
              </button>
            </div>
          
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup