import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import { images } from '../assets/assets'
import { AppContext } from '../context/AppContext'


const Customize = () => {
  
  const {backendImage,setBackendImage,frontendImage,setFrontendImage ,selected, setSelected} =useContext(AppContext)

  const navigate = useNavigate()

  const handleSelect = img => {
    setSelected(img)
    setBackendImage(null);
    setFrontendImage(null)
  }
  const handleBack = () => navigate(-1)

  const handleUpload = () => {
    inputImage.current.click()
    
  }
  const inputImage = useRef()
  const handleImage =(e)=>{
    const file = e.target.files[0];
    setSelected(file)
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#120f81] to-black px-2 py-8">
      <div className=' relative'>
       <h1 className="text-3xl font-bold text-white tracking-wide ">
          <span  className="text-6xl font-black bg-gradient-to-br from-black via-[#153db6] to-indigo-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300"
          >AI</span>VirtualAssistant
        </h1>
     </div>
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="text-white text-2xl mb-6 hover:text-blue-400 transition flex items-center"
        >
          <FiArrowLeft className="mr-2 " /> 
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Select Your <span className="text-blue-400">Assistant Image</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => handleSelect(img)}
              className={`rounded-2xl overflow-hidden border-4 transition-all duration-200 shadow-lg bg-black/30 flex items-center justify-center aspect-[3/4] ${
                selected === img
                  ? 'border-blue-400 scale-105'
                  : 'border-transparent hover:border-blue-400 hover:scale-105'
              }`}
            >
              <img
                src={img}
                alt={`Assistant ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
          <button
            onClick={handleUpload}
            className="rounded-2xl border-4 border-dashed border-blue-400 bg-black/30 flex flex-col items-center justify-center aspect-[3/4] hover:bg-blue-900/40 transition-all duration-200"
          >
           
          { !frontendImage && 
            <>
            <FaPlus className="text-4xl text-blue-400 mb-2" />
            <span className="text-white text-sm">Upload</span>
            </>
          }
          { frontendImage && <>
                 <img
                src={frontendImage}
                alt={`frontendImage`}
                className="object-cover w-full h-full"
              />
          </> }
          </button>
           <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
        </div>
         
      </div>
         <div className="flex justify-end mt-10">
          <button
            disabled={selected === null}
            onClick={() => navigate('/customize2')}
            className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition 
              ${selected !== null 
                ? 'bg-blue-400 text-white hover:bg-blue-600 scale-105' 
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default Customize