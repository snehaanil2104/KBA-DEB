import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const TaxCompliance = () => {
  const [taxSlabs, setTaxSlabs] = useState([]);
  const [newSlab, setNewSlab] = useState({ incomeRange: '', taxRate: '' });
  const [salary, setSalary] = useState('');
  const [calculatedTax, setCalculatedTax] = useState(null);

  // Fetch tax slabs
  const fetchTaxSlabs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/taxCompliance/getSlabs');
      const data = await response.json();
      setTaxSlabs(data);
    } catch (error) {
      console.error('Error fetching tax slabs:', error);
    }
  };

  useEffect(() => {
    fetchTaxSlabs();
  }, []);

  // Handle form input change for new slab
  const handleSlabChange = (e) => {
    const { name, value } = e.target;
    setNewSlab((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new tax slab
  const handleAddSlab = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/taxCompliance/addSlab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlab),
      });
      if (response.ok) {
        setNewSlab({ incomeRange: '', taxRate: '' });
        fetchTaxSlabs(); // Reload slabs after adding a new one
      }
    } catch (error) {
      console.error('Error adding tax slab:', error);
    }
  };

  // Handle salary input change for tax calculation
  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  // Handle calculating tax
  const handleCalculateTax = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/taxCompliance/calculateTax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary }),
      });
      const data = await response.json();
      setCalculatedTax(data.tax);
    } catch (error) {
      console.error('Error calculating tax:', error);
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tax & Compliance Management</h1>

      {/* Add New Tax Slab */}
      <form className="bg-white shadow-md rounded-lg p-6 mb-6" onSubmit={handleAddSlab}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Tax Slab</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="incomeRange"
            value={newSlab.incomeRange}
            onChange={handleSlabChange}
            placeholder="Income Range (e.g., 0-500000)"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="taxRate"
            value={newSlab.taxRate}
            onChange={handleSlabChange}
            placeholder="Tax Rate (%)"
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-700">
          Add Slab
        </button>
      </form>

      {/* Tax Slab List */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Tax Slabs</h2>
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Income Range</th>
            <th className="px-4 py-2">Tax Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {taxSlabs.map((slab, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{slab.incomeRange}</td>
              <td className="px-4 py-2">{slab.taxRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Calculate Tax for Salary */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">Calculate Tax for Salary</h2>
      <form onSubmit={handleCalculateTax} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <input
            type="number"
            value={salary}
            onChange={handleSalaryChange}
            placeholder="Enter Salary"
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-700">
          Calculate Tax
        </button>
      </form>

      {/* Display Calculated Tax */}
      {calculatedTax !== null && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-bold text-gray-800">Calculated Tax: ₹{calculatedTax}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default TaxCompliance;
