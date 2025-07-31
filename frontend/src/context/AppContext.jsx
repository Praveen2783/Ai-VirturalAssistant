
import axios from "axios";
// import { useEffect } from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export const AppContext = createContext()

const AppContextProvider = (props) => {
    // const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()
      const [backendImage,setBackendImage] =useState(null)
  const [frontendImage,setFrontendImage] =useState(null)
  const [selected, setSelected] = useState(null)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // get current user
    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/current",{withCredentials:true});
            if (data.success) {
                // console.log(data)
                setUserData(data)
            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    const logout = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/auth/logout',{withCredentials:true});
            if (data.success) {
                toast.success(data.message)               
                navigate("/login")
                 setUserData(null)
                navigate(0)
                
            }
        } catch (error) {
            toast.error(error.message)
        }

    }


    //gemini api calling
    const getGeminiRes = async(command)=>{
      try {
        const {data} = await axios.post(backendUrl+ '/api/user/asktoassistant',{command},{withCredentials:true})
        return data
        
      } catch (error) {
         toast.error(error.message)
      }
    } 


    useEffect(() => {
        getCurrentUser();
    }, [])


    const value = {
        // token, setToken,
        logout,
        getCurrentUser,
        userData,setUserData,
        backendImage,setBackendImage,
        frontendImage,setFrontendImage,
        selected, setSelected,
        backendUrl,getGeminiRes

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider