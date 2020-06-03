const express = require("express");
const router = express.Router();
const BuyRequest = require("../Models/buy_request_model");

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

module.exports = router;
