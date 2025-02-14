import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the email is a Gmail address
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    setError("");

    // Here you would add your authentication logic.
    // For now, we'll assume a successful login if the email is valid.
    onLogin(email, password);
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bbg">
      <form onSubmit={handleSubmit} className="opacity-95 backdrop-blur-lg p-10 rounded-3xl shadow-xl shadow-[#322139] w-full max-w-sm flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Welcome</h2>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="yourname@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-transparent border-1 text-white"
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-transparent border-1 text-white"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-1/2 bg-[#f6d1ff] text-[#5b4f3b] p-2 rounded hover:bg-blue-100 transition-colors">
          Login
        </button>
      </form>
      <p className="text-white opacity-55">Note: Its just a Front-End page no backend is involved</p>
    </div>
    
  );
}

export default LoginForm;
