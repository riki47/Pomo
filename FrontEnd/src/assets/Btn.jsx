import { useState } from 'react';
import React from 'react'

function Btn(props)
{
    const [clicked,setClicked] = useState(false);
    const [val,setVal] = useState(1);
    return(
        <div className={` ${clicked ? 'bg-[#dec0a3]':''} flex hover:border-white hover:bg-[#332721] flex-col items-center border-[#1b0c05] border-[0.09rem] hover:border-[0.04rem] rounded-xl p-1 pb-3 bg-[#493b31]`}
        style={
            {
                display: props.hide ? 'none' : '',
            }
        }>
            <button
            className={`w-16 h-16 text-[#f4ede4] rounded-lg
                flex items-center justify-center mx-1  `}
                onClick={() => {props.playSound(props.soundKey); setClicked(!clicked)}}
                
            >
            <img src={`${props.icon}`}/>
            </button>
            <div className='flex flex-col items-center h-[0.5rem] w-20'>
                <input 
                style={{
                        opacity: clicked ? '1' : '0.12',
                        pointerEvents: clicked ? 'all' : 'none',
                    }}
                type='range' min ='0' max = '1' step={0.05} value={val}
                className='w-16 h-1 mt-1 rounded-lg custom-range'
                onChange={(e)=>{props.sounds[props.soundKey].volume = e.target.value; setVal(e.target.value)}}
            >
            </input>
            </div>
        </div>
    );
}

export default Btn
