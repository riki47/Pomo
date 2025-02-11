import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Form submitted:', formData);

    try {
        const res = await axios.post('https://pomo-weld.vercel.app/register', formData);
        console.log('Response:', res.data); 
        if (res.status === 201) {
            alert('Registration successful!');
            navigate('/login');
        }
        if(res.status === 202){
            alert('User already exists use another email or login');
        }
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message); 
        alert('The Server is down currently. Please try again later or contact the admin.');
    }
};

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-[#1b1a17] text-[#e5d1b8] font-serif"
      style={{
        backgroundImage: 'url("https://64.media.tumblr.com/c253e0c894134a6d728ae77f32ed98b2/4689fa43d09593aa-07/s1280x1920/ba09cfbc43e42a03fe068d430d1e361c4e60d1f6.gif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="p-8 w-full max-w-lg bg-[#2b2724] rounded-lg shadow-2xl border border-[#8b7969]">
        <h1 className="text-4xl font-bold text-center mb-6 border-b pb-4 border-[#8b7969] tracking-wide">
          Join the Dark Academia Circle
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#3a322e] border border-[#8b7969] text-[#e5d1b8] focus:ring focus:ring-[#a58d7b]"
              placeholder="Your full name"
            />
          </div>
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
              minLength={6}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#3a322e] border border-[#8b7969] text-[#e5d1b8] focus:ring focus:ring-[#a58d7b]"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#8b7969] hover:bg-[#a58d7b] text-white font-bold rounded-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#d1c4b2] underline hover:text-[#b3a089]">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
