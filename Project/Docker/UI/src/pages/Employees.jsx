import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  const [editId, setEditId] = useState(null);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);                       //

  // Add or Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/employees/${editId}`
      : "http://localhost:5000/api/employees";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchEmployees();
        setForm({ name: "", position: "", department: "", salary: "" });
        setEditId(null);
      }
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Set form for editing
  const handleEdit = (employee) => {
    setForm(employee);
    setEditId(employee._id);
  };

  return (
    <div>
    <Navbar/>
    
    <div className="p-6 bg-gray-100 min-h-screen">
        
       
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Employee Management</h1>

      {/* Form for Adding/Editing Employees */}
      <form className="bg-orange shadow-md rounded-lg p-6 mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleInputChange}
            placeholder="Position"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-black px-4 py-2 mt-4 rounded hover:bg-orange-700"
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Employee List */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">Salary</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-b">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.position}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">₹{employee.salary}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="bg-red-600 text-black px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Employees;

