import React, { useState } from 'react';

function TodoApp() {
  const [vals, setVals] = useState([]);
  const [inpval, setInpval] = useState("");

  // Function to add a new task if it isn't already in the list and is not empty.
  const addlist = () => {
    if (!vals.includes(inpval.trim()) && inpval.trim().length > 0 && vals.length<11) {
      setVals(v => [...v, inpval.trim()]);
    }
    if(vals.length == 11)
        alert("dont put too much task in a day")
    setInpval("");
  };

  // Function to remove a task from the list.
  const filterr = (key) => {
    setVals(v => v.filter(val => val !== key));
  };

  // Derive the list content from the current state.
  const content = vals.map((val, idx) => (
    <div key={val} className="flex justify-between items-center bg-[#483c31] rounded-md p-2 my-1 shadow-md">
      <li className="text-white list-none">{val}</li>
      <button
        onClick={() => filterr(val)}
        className="bg-[#261c13] text-red-400 rounded px-2 py-1 hover:bg-red-700 transition duration-300"
      >
        Del
      </button>
    </div>
  ));

  return (
    <div className="min-h-[94vh] w-[100vw] todo flex flex-col items-center justify-start bg-gradient-to-b p-1">
      <div className=" py-6 max-w-md ">
        <h1 className="text-center text-3xl font-bold text-white mb-4">To Do List</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={inpval}
            onChange={(e) => setInpval(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:[#b59c8f]"
          />
          <button
            onClick={addlist}
            className="bg-[#483c31] text-white px-4 py-2 rounded hover:bg-[#8a776d] transition duration-300"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-2">
          {content}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
