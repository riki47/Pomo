import React, { useState, useEffect } from 'react';
import Timer from '../assets/Timer';
import Sounds from '../assets/Sounds';
import ChangeBackground from '../assets/ChangeBackground';
import AboutMe from '../assets/AboutMe';
import 'bootstrap/dist/css/bootstrap.min.css';
// If you use a click sound, ensure it's imported:
import click from '../assets/Sounds/click.mp3';

function Main() {
  // Load background image from localStorage or use a default animated image.
  const [bgImage, setBgImage] = useState(() => {
    const savedBgImage = localStorage.getItem('backgroundImage');
    return savedBgImage
      ? savedBgImage
      : 'url("https://i.pinimg.com/originals/4f/f0/88/4ff088795aff41e835671f1479fa0366.gif")';
  });

  // Pure front‑end states.
  const [isMedium, setIsMedium] = useState(false);
  const [breakTime, setBreak] = useState(false);

  // Update local storage for the background image and listen for window resize.
  useEffect(() => {
    localStorage.setItem('backgroundImage', bgImage);
    const handleResize = () => {
      setIsMedium(window.innerWidth <= 910);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bgImage]);

  // "About" component for break time.
  const About = (
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
          {/* Pass an empty string for email as backend is removed */}
          <Timer setBreak={setBreak} breakTime={breakTime} email="" />
        </div>
        <div className="w-full flex flex-row justify-around pt-10">
          <div 
            onClick={() => {
              const audio = new Audio(click);
              audio.volume = 0.23;
              audio.play();
            }}
          >
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

export default Main;
