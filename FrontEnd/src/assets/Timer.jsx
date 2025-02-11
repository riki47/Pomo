import React, { useEffect, useState, useRef } from 'react';
import click from '../assets/Sounds/click.mp3';
import alarm from '../assets/Sounds/alarm.wav';

function Timer(props) {
  // Get stored values (as numbers) or defaults.
  const initialFocus = Number(localStorage.getItem('ft')) || 25;
  const initialBreak = Number(localStorage.getItem('bt')) || 5;

  const [start, setStart] = useState(false);
  const [focusTime, setFocusTime] = useState(initialFocus);
  const [breakTime, setBreakTime] = useState(initialBreak);
  const [isFocus, setIsFocus] = useState(true);
  const [time, setTime] = useState(focusTime * 60);
  const [status, setStatus] = useState('');

  // Audio reference for the alarm.
  const alarmAudio = useRef(new Audio(alarm)).current;

  // Timer effect: count down while 'start' is true.
  useEffect(() => {
    let timer;
    if (start) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
    if (time <= 0) {
      alarmAudio.play();
    }
    if (time <= 0 && start) {
      setStart(false);
      setIsFocus((prev) => !prev);

      setTime(isFocus ? breakTime * 60 : focusTime * 60);
    }
    if (start ) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if(start && isFocus)
      props.setBreak(false);
    else
      props.setBreak(true);

    console.log(props.breakTime);
    return () => clearInterval(timer);
  }, [start, time, isFocus, breakTime, focusTime, alarmAudio]);

  // Format time (HH:MM:SS)
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Reset the timer based on the current mode.
  const handleSetTime = () => {
    setTime(isFocus ? focusTime * 60 : breakTime * 60);
  };

  // Play click sound.
  const playClickSound = () => {
    const audio = new Audio(click);
    audio.volume = 0.23;
    audio.play();
  };

  // Save settings to localStorage and update timer.
  const handleSubmit = () => {
    playClickSound();
    localStorage.setItem('ft', focusTime);
    localStorage.setItem('bt', breakTime);
    handleSetTime();
    setStatus('Settings saved successfully!');
    // Optionally clear the status message after 2 seconds.
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <div className="h-36 m-0 w-[30rem] sm:w-[35rem] bg-[#6e5b4d] flex flex-row items-center justify-evenly rounded-xl shadow-lg border-2 border-[#2e2722] hover:border-[#7c6c5e]">
      <div className="w-96 flex flex-col items-center justify-center rounded-lg p-4">
        <p className="text-xl font-serif m-1 bg-[#2c2623] rounded-lg px-4 text-[#f4ede4]">
          {isFocus ? 'Focus!' : 'Break!'}
        </p>
        <p className="text-2xl font-serif text-[#f4ede4] mb-1 bg-[#2c2623] w-56 h-9 rounded-lg flex items-center justify-center">
          {formatTime(time)}
        </p>
        <div className="bg-[#2e2723] w-full flex flex-row items-center justify-evenly rounded-lg p-2">
          <button
            className="bg-[#806d63] text-[#f4ede4] px-4 py-1 rounded-md hover:bg-[#5f5048] transition duration-300"
            onClick={() => {
              setTime(isFocus ? focusTime * 60 : breakTime * 60);
              setStart(false);
              playClickSound();
            }}
          >
            RESET
          </button>
          <button
            className="bg-[#806d63] text-[#f4ede4] px-4 py-1 rounded-md hover:bg-[#5f5048] transition duration-300"
            onClick={() => {
              setStart(!start);
              playClickSound();
            }}
          >
            {start ? 'STOP' : 'START'}
          </button>
          {start && (
            <button
              className="bg-[#806d63] text-[#f4ede4] px-4 py-1 rounded-md hover:bg-[#5f5048] transition duration-300"
              onClick={() => {
                setIsFocus(!isFocus);
                setTime(isFocus ? breakTime * 60 : focusTime * 60);
                setStart(false);
                playClickSound();
              }}
            >
              SKIP
            </button>
          )}
        </div>
      </div>

      <form
        className="bg-[#44352e] h-[7.7rem] w-32 sm:w-36 mr-1 rounded-xl flex flex-col justify-around items-center shadow-2xl pb-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-[#f4ede4] font-serif">Focus:</label>
        <input
          className="bg-[#2c2623] text-[#f4ede4] text-center w-28 h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#806d63]"
          type="number"
          placeholder="mins"
          value={focusTime}
          onChange={(e) => setFocusTime(Number(e.target.value))}
        />
        <label className="text-[#f4ede4] font-serif">Break:</label>
        <input
          className="bg-[#2c2623] text-[#f4ede4] text-center w-28 h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#806d63]"
          type="number"
          placeholder="mins"
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
        />
        <button
          type="submit"
          className="bg-[#f4ede4] text-[#2c2623] rounded-lg w-16 mt-2 font-serif hover:bg-[#e1d7ce]"
          onClick={handleSubmit}
        >
          SET
        </button>
      </form>

      {status && (
        <div className="absolute bottom-0 left-0 p-2 bg-green-500 text-white rounded">
          {status}
        </div>
      )}
    </div>
  );
}

export default Timer;
