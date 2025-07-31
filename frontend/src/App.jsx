import React, { useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import {ToastContainer} from 'react-toastify'
import Home from './components/Home'
import Customize from './components/Customize'
import { AppContext } from './context/AppContext'
import Customize2 from './components/Customize2'
// import History from './components/History'
function App() {
 const {userData,setUserData} = useContext(AppContext);
 

  return (
    <>
    {/* <div className='mx-4 sm:mx-[10%]'> */}
    <ToastContainer/>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/'element={(userData?.user?.assistantImage && userData?.user?.assistantName)?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path='/login'element={!userData?<Login/>:<Navigate to={"/"}/>}/>
        <Route path='/signup'element={!userData?<Signup/>:<Navigate to={"/customize"}/>}/>
        <Route path='/customize'element={userData?<Customize/>:<Navigate to={"/login"}/>}/>
        <Route path='/customize2'element={userData?<Customize2/>:<Navigate to={"/login"}/>}/>
        {/* <Route path='/history'element={userData?<History/>:<Navigate to={"/login"}/>}/> */}
      </Routes>
    
    {/* </div> */}
    </>
  )
}

export default App
