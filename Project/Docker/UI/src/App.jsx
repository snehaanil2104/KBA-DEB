import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/protectedRoutes';
import Employees from "./pages/Employees";
import Payroll from './pages/Payroll';
import TaxCompliance from './pages/taxCompliance';
import HomePage from './pages/Home';
// import Viewusers from './pages/Viewusers';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-dashboard"
                    element={
                        <ProtectedRoute role="user">
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/employees" element={<Employees />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/tax-compliance" element={<TaxCompliance />} /> 
                {/* <Route path="/alluser" element={<Viewusers />} /> */}
              
            </Routes>
        </Router>
    );
};

export default App;
