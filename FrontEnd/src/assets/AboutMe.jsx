import React from 'react'
import sh from '../assets/Images/sh.png';
import yt from '../assets/Images/yt.png';
import tic from '../assets/Images/tic.png';
import { useState } from 'react';
import click from '../assets/Sounds/click.mp3';

function AboutMe() {
    const [hide, setHide] = useState(true);
  
    return (
      <div className="md:w-[18rem] flex flex-col items-center">
        <button
          onClick={() => {setHide(!hide);let audio = new Audio(click);audio.play();audio.volume = 0.23;}} 
          className="bg-[#493b31] h-10 font-bold border-[0.1rem] border-[#372111] hover:border-[#d9bfac] hover:border-[0.1rem] text-[#e8dec8]  w-[17.8rem] uppercase text-center rounded-lg "
        >
          Break Ideas {hide ? '⬇' : '⬆'}
        </button>
        <div
          className={`rounded-lg text-[#e8dec8] bg-[#56463c] p-1 flex flex-col items-center justify-between transition-all duration-1000  ease-in-out w-[17.8rem] ${
            hide ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-screen opacity-100'
          }`}
        >
          {!hide && (
            <>
              <p className="bg-[#493b31] text-[#e8dec8] text-center rounded-lg p-2 capitalize text-sm">
                Drink water, Do some excercise, Explore my websites, relax, and have fun!
              </p>
              <a
                href="https://incredible-licorice-28338f.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[0.1rem] flex flex-col overflow-hidden justify-center items-center border-[#917460] bg-[#493b31] text-[#e8dec8] p-1 text-sm rounded-lg mt-1 w-full text-center hover:border-[#d4baa7] hover:border-[0.1rem]"
              >
                Shopping Website
                <img
                  className="rounded-lg mt-1 h-[7rem] w-[75%]"
                  src={sh}
                  alt="Shopping Website Thumbnail"
                />
              </a>
              <a
                href="https://voluble-chimera-6be91c.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[0.1rem] flex flex-col overflow-hidden justify-center items-center border-[#917460] bg-[#493b31] text-[#e8dec8] p-1 text-sm rounded-lg mt-1 w-full text-center hover:border-[#d4baa7] hover:border-[0.1rem]"
              >
                Video Streaming Website
                <img
                  className="rounded-lg mt-1 w-[75%] h-24"
                  src={yt}
                  alt="Tic Tac Toe Website Thumbnail"
                />
              </a>
              <a
                href="https://iridescent-haupia-08aff4.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[0.1rem] flex flex-col overflow-hidden justify-center items-center border-[#917460] bg-[#493b31] text-[#e8dec8] p-1 text-sm rounded-lg mt-1 w-full text-center hover:border-[#d4baa7] hover:border-[0.1rem]"
              >
                Tic Tac Toe
                <img
                  className="rounded-lg mt-1 w-[75%] h-24"
                  src={tic}
                  alt="Tic Tac Toe Website Thumbnail"
                />
              </a>
            </>
          )}
        </div>
      </div>
    );
  }
  

export default AboutMe;
