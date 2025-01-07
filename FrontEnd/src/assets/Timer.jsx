import React, { useEffect, useState } from 'react';
import click from '../assets/Sounds/click.mp3';
import alarm from '../assets/Sounds/alarm.wav';
import { useRef } from 'react';
import axios from 'axios';

function Timer({ setBreak,email }) {
    const [start, setStart] = useState(false);
    const [focusTime, setFocusTime] = useState(localStorage.getItem('ft') || 25);
    const [breakTime, setBreakTime] = useState(localStorage.getItem('bt') || 5);
    const [isFocus, setIsFocus] = useState(true);
    const [time, setTime] = useState( focusTime*60);

    const a = useRef(new Audio(alarm)).current;
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("asdasd");
                    setFocusTime(data.focus);
                    setBreakTime(data.break);
                    setTime(data.focus * 60); // Initialize timer
                }
                console.log(data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
    
        if (email) fetchSettings();
    }, []);

    useEffect(() => {
        let timer;
        setBreak(!isFocus || !start);

        if(start)
        {
            a.pause();
            a.currentTime = 0;
        }
        if(time <= 0)
        {
            a.play();
        }
        
        if (time <= 0 && start) {
            setStart(false);
            setIsFocus((prev) => !prev);
            setTime(isFocus ? breakTime * 60 : focusTime * 60);
        }

        if (start) {
            timer = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
        }

        return () => clearInterval(timer);
    }, [start, time, isFocus, breakTime, focusTime, setBreak]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSetTime = () => {
        setTime(isFocus ? focusTime * 60 : breakTime * 60);
    };

    const playClickSound = () => {
        const audio = new Audio(click);
        audio.volume = 0.23;
        audio.play();
    };

    const [status, setStatus] = useState('');

const handleSubmit = async () => {
    try {
        playClickSound();
        const response = await fetch(`http://localhost:3000/api/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, focusTime, breakTime }),
        });

        if (!response.ok) throw new Error('Failed to save settings');

        handleSetTime();
        console.log("asd");
        setStatus('Settings saved successfully!');
        
    } catch (error) {
        setStatus('Error saving settings');
        console.error('Error:', error);
    }
};

    return (
        <div className="h-36 m-0 w-[30rem] sm:w-[35rem] bg-[#6e5b4d] flex flex-row items-center justify-evenly rounded-xl shadow-lg border-2 border-[#2e2722] hover:border-[#7c6c5e]">
            <div className="w-96 flex flex-col items-center justify-center rounded-lg p-4">
                <p className="text-xl font-serif m-1 bg-[#2c2623] rounded-lg  px-4  text-[#f4ede4]">{isFocus ? 'Focus!' : 'Break!'}</p>
                <p className=" text-2xl font-serif text-[#f4ede4] mb-1 bg-[#2c2623] w-56 h-9 rounded-lg flex items-center justify-center">
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
                    placeholder='mins'
                    value = {focusTime}
                    onChange={(e) => setFocusTime(Number(e.target.value))}
                />
                <label className="text-[#f4ede4] font-serif">Break:</label>
                <input
                    className="bg-[#2c2623] text-[#f4ede4] text-center w-28 h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#806d63]"
                    type="number"
                    placeholder='mins'
                    value=  {breakTime}
                    onChange={(e) => setBreakTime(Number(e.target.value))}
                />
                <button
                    type="submit"
                    className="bg-[#f4ede4] text-[#2c2623] rounded-lg w-16 mt-2 font-serif hover:bg-[#e1d7ce]"
                    onClick={async() => {
                        playClickSound();
                        localStorage.setItem('ft',focusTime);
                        localStorage.setItem('bt',breakTime);
                        handleSubmit();
                    }}
                    
                >
                    SET
                </button>
            </form>
        </div>
    );
}

export default Timer;
