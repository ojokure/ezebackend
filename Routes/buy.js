const express = require("express");
const router = express.Router();
const BuyRequest = require("../Models/buy_request_model");

// A helper to find a single data should we need to
async function getbuyhelper(req, res, next) {
  try {
    buyrequest = await BuyRequest.findById(req.params.id);
    if (buyrequest == null) {
      return res.status(404).json({ message: "Could not find request" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.buyrequest = buyrequest;
  next();
}

// POST ENDPOINT
router.post("/", async (req, res) => {
  const buyrequest = new BuyRequest({
    name: req.body.name,
    storage: req.body.storage,
    condition: req.body.condition,
    price: req.body.price,
  });

  try {
    const newbuyrequest = await buyrequest.save();
    res.status(201).json(newbuyrequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ENDPOINT
router.get("/", async (req, res) => {
  try {
    const buyrequest = await BuyRequest.find();
    res.json(buyrequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
