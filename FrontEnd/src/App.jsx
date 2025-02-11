import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './assets/Main';
import ToDoApp from './assets/ToDoApp';

function App() {
  // State variable to toggle the ToDoApp visibility.
  const [side, setSide] = useState(false);

  return (
    <div>
      <Main />
      <button 
  className="absolute top-0 right-0  hover:border-2 hover:border-white rounded-sm border-[#6e5a49] p-2 bg-[#4d3f2e] text-[#e8dec8] font-serif z-10 shadow-xl shadow-[#684f3e] border-2 hover:bg-[#826b4f] transition duration-300" style={{
    transform: side ? "translateX(100%)" : "translateX(0)"
  }}
  onClick={() => setSide(!side)}
>
  → Set Your To-DO List!
</button>

      <div 
        className="absolute top-0  text-center pt-[1rem] px-2 rounded-xl right-0 transition-transform duration-1000 h-full backdrop-blur-xl  border-1 border-black shadow-2xl shadow-[#684f3e]"
        style={{
          transform: side ? "translateX(0)" : "translateX(100%)"
        }}
      >
        <button className='mb-4 shadow-xl shadow-[#4d3f37] border-1 p-2 rounded-xl backdrop-blur-3xl hover:bg-[#fde2bf] bg-[#3f3329] text-[#fff8f8]' onClick={()=>setSide(!side)}>close</button>
        <ToDoApp />
      </div>
    </div>
  );
}

export default App;
