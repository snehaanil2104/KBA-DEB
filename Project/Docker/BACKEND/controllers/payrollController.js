// const Payroll = require('../models/Payroll');

// const createPayroll = async (req, res) => {
//     try {
//         const { userId, salary } = req.body;
//         const netPay = salary - salary * 0.2; // Example: Calculate net pay with 20% deduction
//         const payroll = new Payroll({ userId, salary, netPay });
//         await payroll.save();
//         res.status(201).json(payroll);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating payroll', error });
//     }
// };



// const getPayroll = async (req, res) => {
//     try {
//         const userId = req.user.role === 'user' ? req.user.id : null; // Admin fetches all
//         const query = userId ? { userId } : {};
//         const payrolls = await Payroll.find(query);
//         res.status(200).json(payrolls);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching payrolls', error });
//     }
// };

// module.exports = { createPayroll, getPayroll };
