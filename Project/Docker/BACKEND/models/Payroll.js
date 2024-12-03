const mongoose = require('mongoose');
const PayrollSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salary: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    netPay: { type: Number, required: true },
});
module.exports = mongoose.model('Payroll', PayrollSchema);
