const express = require("express");
const router = express.Router();
const SellRequest = require("../Models/sell_request_model");

// paginate helper
const paginateResults = require("../Utils/paginate");

// POST ENDPOINT
router.post("/", async (req, res) => {
  const sellrequest = new SellRequest({
    name: req.body.name,
    storage: req.body.storage,
    condition: req.body.condition,
    price: req.body.price,
  });

  try {
    const newsellrequest = await sellrequest.save();
    res.status(201).json(newsellrequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ENDPOINT
router.get("/", paginateResults(SellRequest), async (req, res) => {
  try {
    // const sellrequest = await SellRequest.find();
    res.json(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
