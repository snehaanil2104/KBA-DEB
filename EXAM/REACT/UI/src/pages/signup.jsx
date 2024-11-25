import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (res.ok) {
        toast.success("User registered successfully!");
        navigate('/');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Error in creating user!');
      }
    } catch (error) {
      toast.error('An unexpected error occurred!');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = { userName, password, email, userType };
    signupSubmit(userDetails);
  };

  return (
    <div className="bg-purple-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Sign Up</h2>
        <form onSubmit={submitForm}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded shadow-sm "
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded shadow-sm "
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded shadow-sm "
              required
            />
          </div>
          {/* User Type Field */}
          <div className="mb-6">
            <label htmlFor="userType" className="text-gray-700 font-bold mb-2">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded shadow-sm"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            Sign Up
          </button>
        </form>
        {/* Login Link */}
        <p className="text-center mt-6">
          Already have an account? 
          <Link to="/" className="text-purple-700 hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
