import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav className="bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Payroll System
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/admin-dashboard"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Employees
            </Link>
            <Link
              to="/payroll"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Payroll
            </Link>
            <Link
            to="/tax-compliance"
            className="hover:bg-gray-700 block px-3 py-2 rounded-md text-sm font-medium"
          >
            tax-compliance
          </Link>
          <Logout/>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      

      {/* Mobile Menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/employees"
            className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Employees
          </Link>
          <Link
            to="/payroll"
            className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Payroll
          </Link>
          <Link
            to="/tax-compliance"
            className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            tax-compliance
          </Link>
          
          <Link
            to="/reports"
            className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
