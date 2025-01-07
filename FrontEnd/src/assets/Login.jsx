import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        const res = await axios.post('http://localhost:3000/login', formData);
        
        if (res.status === 200) {
            alert("Login successful!");
            localStorage.setItem('isLoggedIn', true);
            navigate('/main');
        } else {
            alert("Unexpected response from the server.");
        }
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        alert('Login failed. Please check your credentials and try again.');
    }
};

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-[#1b1a17] text-[#e5d1b8] font-serif"
      style={{
        backgroundImage: 'url("https://64.media.tumblr.com/c253e0c894134a6d728ae77f32ed98b2/4689fa43d09593aa-07/s1280x1920/ba09cfbc43e42a03fe068d430d1e361c4e60d1f6.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <div className="p-8 w-full max-w-lg bg-[#2b2724] rounded-lg shadow-2xl border border-[#8b7969]">
        <h1 className="text-4xl font-bold text-center mb-6 border-b pb-4 border-[#8b7969] tracking-wide">
          Login and Unlock the Secrets
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#3a322e] border border-[#8b7969] text-[#e5d1b8] focus:ring focus:ring-[#a58d7b]"
              placeholder="Your email address"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#3a322e] border border-[#8b7969] text-[#e5d1b8] focus:ring focus:ring-[#a58d7b]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#8b7969] hover:bg-[#a58d7b] text-white font-bold rounded-lg transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Don't have an account? {" "}
          <Link
            to="/"
            className="text-[#d1c4b2] underline hover:text-[#b3a089]"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
