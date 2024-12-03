const mongoose = require('mongoose');

const taxSlabSchema = new mongoose.Schema({
  incomeRange: {
    type: String,
    required: true,
  },
  taxRate: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('TaxSlab', taxSlabSchema);
