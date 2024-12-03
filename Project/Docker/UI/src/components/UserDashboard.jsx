import React, { useState, useEffect } from 'react';
import { getPayroll } from '../services/api';
import jsPDF from 'jspdf';

const UserDashboard = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [error, setError] = useState('');

    // Fetch payroll data
    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const data = await getPayroll();
                setPayrolls(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPayrolls();
    }, []);

    const downloadPayslip = (payroll) => {
        const { employeeId, basicSalary, bonus, deductions, netPay, createdAt } = payroll;
    
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text("Payslip", 14, 20);
        doc.setFontSize(12);
        doc.text(`Employee ID: ${employeeId}`, 14, 30);
        doc.text(`Basic Salary: ₹${basicSalary}`, 14, 40);
        doc.text(`Bonus: ₹${bonus}`, 14, 50);
        doc.text(`Deductions: ₹${deductions}`, 14, 60);
        doc.text(`Net Pay: ₹${netPay}`, 14, 70);
        doc.text(`Date: ${new Date(createdAt).toLocaleDateString()}`, 14, 80);
    
        doc.save(`Payslip_${employeeId}.pdf`);
    };

    return (

        <div>
                <nav className="bg-orange-600 p-4 text-white">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-xl font-bold">MyDashboard</div>
                <div className="space-x-4">
                    <a href="/login" className="hover:text-gray-200">Logout</a>
                </div>
            </div>
        </nav>
        <div className="p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
            {error && <p className="text-red-500">{error}</p>}

            {/* Display Payrolls */}
            <h3 className="text-xl font-medium text-gray-700 mt-6 mb-2">Your Payroll</h3>
            <ul className="space-y-2">
                {payrolls.map((payroll) => (
                    <li key={payroll._id} className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <div className="flex justify-between text-gray-800">
                            <span className="font-semibold">Salary:</span>
                            <span>{payroll.basicSalary}</span>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <span className="font-semibold">Bonus:</span>
                            <span>{payroll.bonus}</span>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <span className="font-semibold">Deduction:</span>
                            <span>{payroll.deductions}</span>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <span className="font-semibold">Net Pay:</span>
                            <span>{payroll.netPay}</span>
                        </div>
                        {/* Download Payslip Button */}
                        <button
                            onClick={() => downloadPayslip(payroll)} // Pass payroll as parameter
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
                        >
                            Download Payslip
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default UserDashboard;

