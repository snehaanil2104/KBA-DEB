const express = require("express");
const TaxSlab = require("../models/TaxSlab");
const router = express.Router();

// Get all tax slabs
router.get("/", async (req, res) => {
  try {
    const taxSlabs = await TaxSlab.find();
    res.json(taxSlabs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new tax slab
router.post("/", async (req, res) => {
  const newTaxSlab = new TaxSlab(req.body);
  try {
    await newTaxSlab.save();
    res.status(201).json(newTaxSlab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
