const mongoose = require("mongoose");

const buyRequestSchema = new mongoose.Schema({
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

module.exports = mongoose.model("BuyRequest", buyRequestSchema);
