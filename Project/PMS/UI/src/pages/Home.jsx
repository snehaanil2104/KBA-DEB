import React from 'react';
import { Link } from 'react-router-dom';
import pmimg from '/pmimg.jpg';

const HomePage = () => {
  return (
    <div className="bg-cover h-screen flex flex-col justify-between" style={{backgroundImage:`url(${pmimg})`}}>
      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 p-4">
        <div className=" max-w-8xl mx-auto  flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Payroll Management System</h1>
         
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h2 className="text-white text-4xl font-bold mb-4">
            Welcome to Payroll Management System
          </h2>
          <p className="text-white text-lg mb-8">
            Manage your payroll efficiently and effortlessly.
          </p>
          <Link
            to="/login"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 text-white text-center p-4">
        <p>&copy; 2024 Payroll Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
