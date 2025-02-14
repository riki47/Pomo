import React, { useRef, useState } from 'react';
import rainSound from './Sounds/rain.mp3';
import cafeSound from './Sounds/cafe.mp3';
import thunderSound from './Sounds/thunder.mp3';
import birdsSound from './Sounds/birds.mp3';
import nightSound from './Sounds/night.mp3';
import noiseSound from './Sounds/noise.wav';
import Btn from './Btn';
import rainIcon from '../assets/icons/rainicon.png';
import cafe from '../assets/icons/cafe.png';
import thunder from '../assets/icons/thunder.png';
import birds from '../assets/icons/birds.png';
import night from '../assets/icons/night.png';
import noise from '../assets/icons/noise.png';
import click from '../assets/Sounds/click.mp3';

function Sounds() {
  const sounds = useRef({
    buzzer: (() => {
      const audio = new Audio(rainSound);
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 5) {
          audio.currentTime = 0;
          audio.play();
        }
      });
      return audio;
    })(),
    cafe: (() => {
      const audio = new Audio(cafeSound);
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 28) {
          audio.currentTime = 1;
          audio.play();
        }
      });
      return audio;
    })(),
    thunder: (() => {
      const audio = new Audio(thunderSound);
      audio.currentTime = 2.5;
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 60) {
          audio.currentTime = 2.5;
          audio.play();
        }
      });
      return audio;
    })(),
    birds: (() => {
      const audio = new Audio(birdsSound);
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 60) {
          audio.currentTime = 1;
          audio.play();
        }
      });
      return audio;
    })(),
    night: (() => {
      const audio = new Audio(nightSound);
      audio.currentTime = 2.5;
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 50) {
          audio.currentTime = 2.5;
          audio.play();
        }
      });
      return audio;
    })(),
    noise: (() => {
      const audio = new Audio(noiseSound);
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 50) {
          audio.currentTime = 1;
          audio.play();
        }
      });
      return audio;
    })(),
  }).current;
  const [playing, setPlaying] = useState({
    buzzer: false,
    cafe: false,
  });

  const [hide, setHide] = useState(true);

  const playSound = (soundKey) => { //playing the sound
    const sound = sounds[soundKey];
    if (playing[soundKey]) {
      sound.pause();
      setPlaying((prev) => ({
        ...prev,
        [soundKey]: false,
      }));
    } else {
      sound.play();
      setPlaying((prev) => ({
        ...prev,
        [soundKey]: true,
      }));
    }
  };

  const icons = {
    buzzer: rainIcon,
    cafe: cafe,
    thunder: thunder,
    birds: birds,
    night : night,
    noise : noise
  };

  const content = (
    <div
      className="max-w-[97vw] w-[18.8rem] transition-all duration-700 h-[25rem] overflow-scroll flex flex-wrap justify-evenly items-center rounded-lg p-4 bg-[#56463c] border-1 border-[#a59389] shadow-md"
      style={{
        height: hide ? '0' : '',
        opacity: hide ? 0 : 1,
      }}
    >
      {Object.keys(sounds).map((soundKey, index) => (
        <div key={index} className="w-[6rem] flex flex-col items-center mb-4">
          <Btn hide = {hide} playSound={playSound} soundKey={soundKey} icon={icons[soundKey]} sounds = {sounds} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-[97vw] w-[20rem] text-center font-bold text-[#d4c2b0] rounded-lg flex flex-col justify-center items-center">
      <button
        onClick={() => {
          setHide(!hide);
          const audio = new Audio(click);
          audio.play();
          audio.volume = 0.23;
        }}
        className="hover:border-[#ffe5d2] border-[0.1rem] hover:border-[0.1rem]  border-[#412203] max-w-[90vw] w-[19rem] rounded-xl font-serif tracking-wide bg-[#50443b] text-[#e8dec8] px-4 py-2 shadow-md "
      >
        AMBIENCE SOUNDS {hide ? '⬇' : '⬆'}
      </button>
      {content}
    </div>
  );
}

export default Sounds;
