import React, { useState } from 'react';
import click from '../assets/Sounds/click.mp3';

function ChangeBackground({ setBgImage }) {
    const [hide, setHide] = useState(true);
    const [customImage, setCustomImage] = useState('');

    const images = [
        'url("https://i.pinimg.com/originals/5f/8e/ec/5f8eec623ed8dadc968ce3565c7d8ea2.gif")',
        'url(https://i.pinimg.com/originals/01/4b/b9/014bb94863c0ae597d6f4be224128bdb.gif)',
        'url("https://i.pinimg.com/originals/18/b1/77/18b177f65bd1119ce41186d0d0959910.gif")',
        'url("https://i.pinimg.com/originals/d8/9f/a3/d89fa383107571201d3b2673e4e9a51b.gif")',
        'url("https://i.pinimg.com/originals/4f/f0/88/4ff088795aff41e835671f1479fa0366.gif")',
        'url("https://64.media.tumblr.com/c253e0c894134a6d728ae77f32ed98b2/4689fa43d09593aa-07/s1280x1920/ba09cfbc43e42a03fe068d430d1e361c4e60d1f6.gif")',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customImage) {
            setBgImage(`url("${customImage}")`);
        }
    };

    const playClickSound = () => {
        const audio = new Audio(click);
        audio.volume = 0.23;
        audio.play();
    };

    return (
        <div className="flex-col items-start transition-all duration-1000 hidden md:flex">
            <button
                onClick={() => { setHide(!hide); playClickSound(); }}
                className="w-[18rem] border-[0.1rem] border-[#3b2212] hover:border-[#dbbda7] hover:border-[0.1rem] rounded-xl font-serif font-bold tracking-wide bg-[#493b31] text-[#e8dec8] px-2 py-2 shadow-md "
            >
                CHANGE BACKGROUND {hide ? '⬇' : '⬆'}
            </button>

            <div
                className={`flex flex-col lg:h-[32rem] overflow-hidden bg-[#56463c] rounded-lg shadow-lg border-[0.01rem] border-[#af8f76] transition-all duration-1000 ease-in-out`}
                style={{
                    maxHeight: hide ? '0' : '600px',
                    opacity: hide ? 0 : 1,
                    padding: hide ? '0' : '0.2rem',
                }}
            >
                {images.map((image, index) => (
                    <button
                        key={index}
                        className="w-[17rem] hover:border-[0.69rem] border-[#534031] h-20 m-1 rounded-lg overflow-hidden  transition-all duration-200 ease-in-out"
                        onClick={() => setBgImage(image)}
                    >
                        <div
                            className="border-1 border-[#cdb693] w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
                            style={{ backgroundImage: image }}
                        />
                    </button>
                ))}

                <form onSubmit={handleSubmit} className="text-white flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Custom image URL"
                        value={customImage}
                        required
                        onChange={(e) => setCustomImage(e.target.value)}
                        className="mt-1 bg-[#a08771] w-full rounded-lg placeholder-white text-center capitalize"
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-[#a69176] px-2 pt-1 rounded-lg hover:bg-[#6f614f]"
                        onClick={playClickSound}
                    >
                        Set Background
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangeBackground;
