const express = require("express");
const Payroll = require("../models/payrollSchema"); // Ensure the correct path to the schema file
const router = express.Router();

// Add a new payroll record
router.post("/", async (req, res) => {
  try {
    const { employeeId, basicSalary, bonus, deductions } = req.body;

    // Calculate net pay
    const netPay = basicSalary + (bonus || 0) - (deductions || 0);

    // Create a new payroll instance
    const payroll = new Payroll({
      employeeId,
      basicSalary,
      bonus,
      deductions,
      netPay,
    });

    // Save the payroll to the database
    await payroll.save();
    res.status(201).json({ message: "Payroll added successfully", payroll });
  } catch (error) {
    console.error("Error adding payroll:", error.message);
    res.status(500).json({ message: "Failed to add payroll", error: error.message });
  }
});

// Get all payroll records
router.get("/", async (req, res) => {
  try {
    const payrolls = await Payroll.find(); // Fetch all records
    res.status(200).json(payrolls);
  } catch (error) {
    console.error("Error fetching payrolls:", error.message);
    res.status(500).json({ message: "Failed to fetch payrolls", error: error.message });
  }
});

// Get payroll details for a specific employee by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await Payroll.findOne({ employeeId: id }); // Fetch by employeeId
    if (!payroll) {
      return res.status(404).json({ message: "Payroll record not found" });
    }
    res.status(200).json(payroll);
  } catch (error) {
    console.error("Error fetching payroll:", error.message);
    res.status(500).json({ message: "Failed to fetch payroll", error: error.message });
  }
});

// Update a payroll record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { basicSalary, bonus, deductions } = req.body;

    // Calculate updated net pay
    const netPay = basicSalary + (bonus || 0) - (deductions || 0);

    // Update the payroll record
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      id,
      { basicSalary, bonus, deductions, netPay },
      { new: true }
    );

    if (!updatedPayroll) {
      return res.status(404).json({ message: "Payroll record not found" });
    }
    res.status(200).json({ message: "Payroll updated successfully", updatedPayroll });
  } catch (error) {
    console.error("Error updating payroll:", error.message);
    res.status(500).json({ message: "Failed to update payroll", error: error.message });
  }
});

// Delete a payroll record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayroll = await Payroll.findByIdAndDelete(id);

    if (!deletedPayroll) {
      return res.status(404).json({ message: "Payroll record not found" });
    }
    res.status(200).json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error("Error deleting payroll:", error.message);
    res.status(500).json({ message: "Failed to delete payroll", error: error.message });
  }
});



module.exports = router;
