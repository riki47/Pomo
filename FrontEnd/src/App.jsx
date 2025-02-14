import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./assets/Main";
import ToDoApp from "./assets/ToDoApp";
import LoginForm from "./assets/LoginForm"; // adjust the path as needed

function App() {
  const [act, setAct] = useState("Home");
  // Check localStorage to see if user is already authenticated.
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // Called when the user logs in successfully.
  const handleLogin = (email, password) => {
    // Add your authentication logic here.
    // For now, we'll assume a successful login if the email is valid.
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  // If not authenticated, only show the login form.
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div>
        <nav className="text-sm p-2 bg-[#2c2623] text-[#e8dec8] font-serif flex flex-wrap justify-between items-center shadow-md shadow-[#3f3329] border-b-[1px] border-[#524034]">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-bold hidden sm:block tracking-wide text-[#c4b7a6]">𝒫𝑜𝓂𝑜𝒹𝑜𝓇𝑜</h1>
            <Link
              onClick={(ev) => {
                setAct(ev.target.innerText);
              }}
              to="/"
              className="p-2 lk text-[#e8dec8] hover:text-[#c4b7a6] transition duration-300 ease-in-out border-b-2 border-transparent hover:border-[#c4b7a6]"
              style={{
                border: act === "Home" ? "solid #c4b7a6 1px" : "",
              }}
            >
              Home
            </Link>
            <Link
              onClick={(ev) => {
                setAct(ev.target.innerText);
              }}
              to="/todo"
              className="p-2 lk text-[#e8dec8] hover:text-[#c4b7a6] transition duration-300 ease-in-out border-b-2 border-transparent hover:border-[#c4b7a6]"
              style={{
                border: act === "To-DO ⏳" ? "solid #c4b7a6 1px" : "",
              }}
            >
              To-DO ⏳
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="p-1  px-2 bg-[#814944] text-white rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/todo" element={<ToDoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
