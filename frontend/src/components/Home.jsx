import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import { MdOutlineMenu, MdClose } from 'react-icons/md'
import { FaHistory } from "react-icons/fa";
const Home = () => {
  const { userData, logout, getGeminiRes } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  const [dropHis, setDropHis] = useState(false)
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const isRecognizingRef = useRef(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis
  const assistantName = userData?.user?.assistantName || "Your Assistant"
  const assistantImage = userData?.user?.assistantImage


  const startRecognation = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start()
        setListening(true)
      } catch (error) {
        if (!error.name !== "InvalidStateError") {
          console.error("Recognation error:", error)
        }

      }
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    // Get the available voices from the SpeechSynthesis API
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiText("")
      isSpeakingRef.current = false;
      setTimeout(() => {

        startRecognation();
      }, 800)
    };
    synth.cancel();
    synth.speak(utterance);
  }

  const handleCommand = (data) => {
    const { type, userInput, response } = data
    speak(response);
    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    if (type === "chatgpt") {
      // const query = encodeURIComponent(userInput);
      window.open(`https://chatgpt.com/`, '_blank');
    }
    // if (type === "chatgpt") {
    //   const query = encodeURIComponent(userInput);
    //   window.open(`https://chatgpt.com/c/${query}`, '_blank');
    // }
    if (type === "calculator_open") {
      // const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }
    if (type === "instagram_open") {
      // const query = encodeURIComponent(userInput);
      window.open(`https://www.instagram.com/`, '_blank');
    }
    if (type === "facebook_open") {
      // const query = encodeURIComponent(userInput);
      window.open(`https://www.facebook.com/`, '_blank');
    }
    if (type === "weather-show") {
      // const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=wheather`, '_blank');
    }
    if (type === "youtube_play" || type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }


  }




  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    let isMounted = true; //flag avoid setState on unmounted components


    //  start recognition after 1sec delay only if components still mounted
    const startTimeOut = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("recognition req is start")
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.log(error)
          }

        }
      }
    }, 1000);



    recognition.onstart = () => {
      console.log("Recognition started")
      isRecognizingRef.current = true;
      setListening(true);
    }

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);

      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted");
            } catch (error) {
              if (error.name !== "InvalidStateError") {
                console.log(error)
              }

            }
          }

        }, 1000); //avoid the rapid loop
      }
    };

    recognition.onerror = (e) => {
      console.warn("Recognition error", e.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (e.error !== "aborted" && isMounted  && !isSpeakingRef.current) {
        setTimeout(() => {
          if(isMounted){
            try {
              recognition.start();
              console.log("Recognition restart after error")
            } catch (error) {
               if (error.name !== "InvalidStateError") {
                console.log(error)
              }           
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()

      if (transcript.toLowerCase().includes(userData?.user?.assistantName.toLowerCase())) {
        setAiText("")
        setUserText(transcript)
        recognition.stop()
        isRecognizingRef.current = false
        setListening(false)
        const data = await getGeminiRes(transcript)
        setAiText(data.response)
        setUserText("")
        handleCommand(data)
      }
    }


    const greeting =new SpeechSynthesisUtterance(`Hello ${userData?.user?.name}, what can I help you with?`);
    greeting.lang = 'hi-IN';
   
    window.speechSynthesis.speak(greeting);

   
    return () => {
      isMounted =false
      clearTimeout(startTimeOut);
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      // clearInterval(fallBack)
    }

  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#120f81] to-black relative overflow-x-hidden">

      {/* Title */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide relative top-6">
          <span className="text-5xl md:text-6xl font-black bg-gradient-to-br from-black via-[#153db6] to-indigo-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
            AI
          </span>
          VirtualAssistant
        </h1>
      </div>

      {/* mobile menu */}
      <MdOutlineMenu className=' absolute top-6  right-4 text-white text-3xl lg:hidden' onClick={() => {
        setOpen(true)
      }} />

      <div className={`lg:hidden absolute  top-0 w-full h-full bg-[#00000070] backdrop-blur-lg   ${open ? " translate-x-0" : " translate-x-full"} transition-transform duration-200`}>
        <MdClose className='text-white absolute top-6 right-4 text-3xl' onClick={() => setOpen(false)} />

        <div className="  flex flex-col items-start p-[20px] relative top-15 gap-6 md:gap-8 z-10 ">
          <button
            onClick={() => logout()}
            className="  px-6 py-3 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold text-base md:text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
          >
            Log Out
          </button>
          <button
            onClick={() => navigate('/customize')}
            className=" px-6  py-3 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold text-base md:text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
          >
            Customize Your Assistant
          </button>
          <div className='w-full h-[2px] bg-gray-400'></div>
          <p
            onClick={() => {
              dropHis === false ?
                setDropHis(true) : setDropHis(false)
            }}
            className=" hover:text-blue-400 font-semibold text-2xl text-white transition cursor-pointer relative left-8"
          >
            <FaHistory className=' relative top-7 right-9 cursor-pointer' />History

          </p>


          <div className={`w-full h-[400px] overflow-y-auto gap-[20px] flex flex-col  truncate ${dropHis ? " translate-x-0" : "translate-x-[1000px]"} transition-transform`}>

            {
              userData?.user?.history.map((his,i) => (
                <span key={i} className=' text-gray-200  text-[18px] '>{his}</span>
              ))
            }

          </div>
        </div>
      </div>

      {/* Top right buttons destop */}
      <div className="absolute top-6 right-4 flex flex-col gap-3 md:gap-8 z-10">

        <button
          onClick={() => logout()}
          className=" hidden lg:block px-4 py-2 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold text-base md:text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
        >
          Log Out
        </button>
        <button
          onClick={() => navigate('/customize')}
          className="hidden lg:block px-4  py-2 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold text-base md:text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
        >
          Customize Your Assistant
        </button>

        <p
          onClick={() => {
            dropHis === false ?
              setDropHis(true) : setDropHis(false)
          }}
          className="hidden lg:block hover:text-blue-400 font-semibold text-base  text-white transition cursor-pointer lg:relative left-50"
        >
          <FaHistory className=' relative top-5 right-6 cursor-pointer' />History
        </p>
      </div>

      <div className=" hidden lg:block absolute top-[32%] right-2  flex-col gap-3 md:gap-8 z-10 rounded-2xl " >
        <div className={` w-[350px] h-[400px] scrollbar-hide  overflow-y-auto  gap-[20px] flex flex-col  ${dropHis ? " translate-x-0" : "translate-x-[445px]"} transition-transform  rounded-2xl  `}>

          {
            userData?.user?.history.map((his,i) => (
              <span key={i} className=' text-gray-200  text-[18px] px-[20px] '>{his}</span>
            ))
          }

        </div>
      </div>


      {/* Assistant Card */}
      <div className="flex flex-col items-center justify-center w-full pt-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-black/30 w-[220px] h-[300px] md:w-[300px] md:h-[400px] flex items-center justify-center mb-6">
          <img
            src={assistantImage}
            alt="Assistant"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-white text-lg md:text-xl font-semibold mb-10 text-center">
          I'm {assistantName}
        </div>
        {/* Glowing circle animation */}
        <div className="flex items-center justify-center">
          {aiText ?
            <img
              className="w-32 h-20 md:w-48 md:h-32 rounded-full"
              src="/src/assets/ai.gif"
              alt=""
            /> :
            <img
              className="w-32 h-20 md:w-48 md:h-32 rounded-full"
              src="/src/assets/user.gif"
              alt=""
            />
          }
        </div>

        <h1 className='text-gray-300'>{userText ? userText : aiText ? aiText : null}</h1>
      </div>
    </div>
  )
}

export default Home