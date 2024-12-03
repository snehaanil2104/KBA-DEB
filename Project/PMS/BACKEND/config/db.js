const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/PAYROLL_MSA");
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;