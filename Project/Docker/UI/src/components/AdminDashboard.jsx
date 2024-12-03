import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    
    <div className="bg-gray-100">
     <Navbar/>

      {/* Main Dashboard Section */}
      <div className="mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Admin!
        </h2>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Employee Management"
            description="Add, edit, or remove employees"
            link="/employees"
            buttonText="Manage"
          />
          <DashboardCard
            title="Payroll"
            description="Process and generate payslips"
            link="/payroll"
            buttonText="Process"
          />
          <DashboardCard
            title="Tax & Compliance"
            description="Manage tax calculations and compliance"
            link="/tax-compliance"
            buttonText="Manage"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable DashboardCard Component

const DashboardCard = ({ title, description, link, buttonText }) => (
  
  <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between">
    
    <div>
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
    <Link
      to={link}
      className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded"
    >
      {buttonText}
    </Link>
  </div>
  
);

export default Dashboard;

