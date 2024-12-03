import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import Navbar from "../components/Navbar";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]); // State to store payroll records
  const [form, setForm] = useState({
    employeeId: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
  }); // State for form input
  const [previewPayslip, setPreviewPayslip] = useState(null); // State to store the selected payslip for preview
  const [message, setMessage] = useState(""); // State to display submission status messages

  // Fetch payroll data from the backend
  const fetchPayrolls = async () => {
    try {
      const response = await fetch("/api/payroll");
      if (response.ok) {
        const data = await response.json();
        setPayrolls(data);
      } else {
        throw new Error("Failed to fetch payroll data");
      }
    } catch (error) {
      console.error("Error fetching payroll data:", error);
      setMessage("Failed to load payroll data.");
    }
  };

  // Load payrolls on component mount
  useEffect(() => {
    fetchPayrolls();
  }, []);

  // Handle form submission to add payroll
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { employeeId, basicSalary, bonus, deductions } = form;

      // Calculate net pay
      const netPay =
        parseFloat(basicSalary) + (parseFloat(bonus) || 0) - (parseFloat(deductions) || 0);

      // Payload for submission
      const payrollData = {
        employeeId,
        basicSalary: parseFloat(basicSalary),
        bonus: parseFloat(bonus) || 0,
        deductions: parseFloat(deductions) || 0,
        netPay,
      };

      const response = await fetch("/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payrollData),
      });

      if (response.ok) {
        setMessage("Payroll added successfully!");
        fetchPayrolls(); // Refresh payrolls
        setForm({ employeeId: "", basicSalary: "", bonus: "", deductions: "" }); // Reset form
      } else {
        const errorResponse = await response.json();
        setMessage(`Failed to add payroll: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error submitting payroll:", error);
      setMessage("An error occurred while submitting payroll.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Function to generate payslip preview
  const generatePayslip = (payroll) => {
    setPreviewPayslip(payroll);
  };

  // Function to download the payslip PDF
  const downloadPayslip = () => {
    if (!previewPayslip) return;

    const doc = new jsPDF();
    const { employeeId, basicSalary, bonus, deductions, netPay, createdAt } = previewPayslip;

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
      <Navbar/>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Payroll Management</h1>

      {/* Payroll Form */}
      <form className="bg-white shadow-md rounded-lg p-6 mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="employeeId"
            value={form.employeeId}
            onChange={handleInputChange}
            placeholder="Employee ID"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="basicSalary"
            value={form.basicSalary}
            onChange={handleInputChange}
            placeholder="Basic Salary"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="bonus"
            value={form.bonus}
            onChange={handleInputChange}
            placeholder="Bonus"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="deductions"
            value={form.deductions}
            onChange={handleInputChange}
            placeholder="Deductions"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-700"
        >
          Add Payroll
        </button>
      </form>

      {/* Message */}
      {message && <p className="text-lg text-center text-red-500 mb-4">{message}</p>}

      {/* Payroll List */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Employee ID</th>
            <th className="px-4 py-2 text-left">Basic Salary</th>
            <th className="px-4 py-2 text-left">Bonus</th>
            <th className="px-4 py-2 text-left">Deductions</th>
            <th className="px-4 py-2 text-left">Net Pay</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{payroll.employeeId}</td>
              <td className="px-4 py-2">₹{payroll.basicSalary}</td>
              <td className="px-4 py-2">₹{payroll.bonus}</td>
              <td className="px-4 py-2">₹{payroll.deductions}</td>
              <td className="px-4 py-2 font-bold">₹{payroll.netPay}</td>
              <td className="px-4 py-2">{new Date(payroll.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => generatePayslip(payroll)}
                  className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded"
                >
                  Generate Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payslip Preview */}
      {previewPayslip && (
        <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Payslip Preview</h2>
          <div className="mb-4">
            <p><strong>Employee ID:</strong> {previewPayslip.employeeId}</p>
            <p><strong>Basic Salary:</strong> ₹{previewPayslip.basicSalary}</p>
            <p><strong>Bonus:</strong> ₹{previewPayslip.bonus}</p>
            <p><strong>Deductions:</strong> ₹{previewPayslip.deductions}</p>
            <p><strong>Net Pay:</strong> ₹{previewPayslip.netPay}</p>
            <p><strong>Date:</strong> {new Date(previewPayslip.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={downloadPayslip}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Download Payslip
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Payroll;
