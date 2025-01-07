
import { useState, useEffect } from 'react';
import React from 'react';
import Timer from './assets/Timer';
import Sounds from './assets/Sounds';
import ChangeBackground from './assets/ChangeBackground';
import AboutMe from './assets/AboutMe';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './assets/Signup';
import Login from './assets/Login';
import ProtectedRoute from './assets/ProtectedRoute';  // Import ProtectedRoute
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudyTracker from './assets/Study';

function Main() {
  const [bgImage, setBgImage] = useState(() => {
    const savedBgImage = localStorage.getItem('backgroundImage');
    return savedBgImage ? savedBgImage : 'url("https://i.pinimg.com/originals/4f/f0/88/4ff088795aff41e835671f1479fa0366.gif")';
  });

  const navigate = useNavigate();
  const [name , setName] = useState('');
  const [isMedium, setIsMedium] = useState(false);
  const [breakTime, setBreak] = useState(false);
  const [,forceUpdate]  = useState(false);
  const [email,setEmail] = useState("");

  const getName = async () => {
    try {
      const res = await axios.get('http://localhost:3000/');
      const {name,email} = res.data
      setName(name);
      setEmail(email);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  }
  useEffect(() => {
    console.log("status  "+localStorage.getItem('isLoggedIn'));
  });

  useEffect(() => {
    getName();
    if (bgImage) {
      localStorage.setItem('backgroundImage', bgImage);
    }
    const handleResize = () => {
      setIsMedium(window.innerWidth <= 910);
      console.log(isMedium);
    };
    addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[bgImage, isMedium]);

  let About = (
    <div className='hidden md:flex'>
      <AboutMe />
    </div>
  );

  return (
    <div
      className="relative w-[100vw] h-[100vh]"
      style={{
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
      }}
    >
      <div className="transition-all duration-1000 ease-in-out relative w-full h-full flex flex-col items-center justify-start py-4 font-serif">
        <div className='flex flex-wrap justify-center items-center'>
          {/* <StudyTracker email = {email}/> */}
          <Timer setBreak={setBreak} email = {email}/>
          <div className='flex md:flex-col items-center'>
            <div className='bg-[#2e2723] border-1 border-[#6b5846] text-[#e8dec8] font-serif p-2 rounded-lg shadow-lg m-1'>
              {name}
            </div>
            <button 
            onClick={() => {localStorage.setItem('isLoggedIn', false);navigate('/login');forceUpdate(true);}}
            className='bg-[#2e2723] border-1 border-[#6b5846] text-[#e8dec8]  font-serif p-2 rounded-lg shadow-lg hover:border-[#d3b89e]'>
              Logout
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row justify-around pt-10">
          <div onClick={() => {
            const audio = new Audio(click);
            audio.play();
          }}>
            <Sounds />
          </div>
          {breakTime && About}
          <div className="hidden md:flex" style={{ display: breakTime && isMedium ? 'none' : '' }}>
            <ChangeBackground setBgImage={setBgImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(localStorage.getItem('isLoggedIn') === "false" && <Signup /> ) } />
        <Route path="/" element={(localStorage.getItem('isLoggedIn') === "true" && <Main />)} />
        <Route path="/login" element={<Login />} />

        {/* Protected route for /main */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
