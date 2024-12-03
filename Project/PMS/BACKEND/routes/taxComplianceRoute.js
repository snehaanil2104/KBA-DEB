const express = require('express');
const TaxSlab = require('../models/TaxSlab');
const router = express.Router();

// Add a new tax slab
router.post('/addSlab', async (req, res) => {
  const { incomeRange, taxRate } = req.body;

  try {
    const newSlab = new TaxSlab({ incomeRange, taxRate });
    await newSlab.save();
    res.status(201).json({ message: 'Tax Slab added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding tax slab', error });
  }
});

// Get all tax slabs
router.get('/getSlabs', async (req, res) => {
  try {
    const slabs = await TaxSlab.find();
    res.status(200).json(slabs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tax slabs', error });
  }
});

// Calculate tax for a given salary
router.post('/calculateTax', async (req, res) => {
  const { salary } = req.body;

  try {
    const slabs = await TaxSlab.find();
    let tax = 0;

    for (const slab of slabs) {
      const [minIncome, maxIncome] = slab.incomeRange.split('-').map(Number);
      if (salary >= minIncome && salary <= maxIncome) {
        tax = (salary * slab.taxRate) / 100;
        break;
      }
    }

    res.status(200).json({ salary, tax });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating tax', error });
  }
});

module.exports = router;
