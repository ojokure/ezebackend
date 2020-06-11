const mongoose = require("mongoose");

const sellRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SellRequest", sellRequestSchema);
