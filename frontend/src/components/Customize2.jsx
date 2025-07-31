import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Customize2 = () => {
  const { userData, backendImage, selected, backendUrl, setUserData } = useContext(AppContext)
  const [assistantName, setAssistantName] = useState(userData?.user?.assistantName || '')
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)
  const handleAssistant = async () => {
    try {
      const formData = new FormData()
      formData.append("assistantName", assistantName)
      if (backendImage) {
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selected)
      }
      const { data } = await axios.post(backendUrl + "/api/user/update-assistant", formData, { withCredentials: true })
      if (data.success) {
        setUserData(data)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#120f81] to-black px-2 py-8">
         <div className="w-full flex justify-center mt-8 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide relative md:bottom-44">
          <span className="text-5xl md:text-6xl font-black bg-gradient-to-br from-black via-[#153db6] to-indigo-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
            AI
          </span>
          VirtualAssistant
        </h1>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="text-white text-2xl mb-8 hover:text-blue-400 transition flex items-center"
        >
          <FiArrowLeft />
        </button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Enter Your <span className="text-blue-400">Assistant Name</span>
        </h2>
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            value={assistantName}
            onChange={e => setAssistantName(e.target.value)}
            placeholder="Assistant Name"
            className="w-full sm:w-[400px] md:w-[700px] px-6 py-4 rounded-full border border-gray-300 bg-transparent text-white text-lg md:text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-8"
          />
          <button
            disabled={!assistantName.trim()}
            onClick={handleAssistant}
            className={`px-6 py-3 rounded-full font-semibold text-base md:text-lg shadow-lg transition
              ${assistantName.trim()
                ? 'bg-white text-black hover:bg-blue-400 hover:text-white scale-105'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
          >
            Finally Create Your Assistant
          </button>
        </div>
      </div>
    </div>
  )
}

export default Customize2