const express = require("express");
const app = express();
const mongoose = require("mongoose");

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startPage = (page - 1) * limit;
    const lastPage = page * limit;

    const results = {};

    if (lastPage < (await model.countDocuments().exec())) {
      length = await model.countDocuments().exec();
      totalPages = Math.floor(length / limit);

      results.next = {
        totalPages: totalPages,
        nextPage: page + 1,
        currentPage: page,
        limit: limit,
      };
    }

    if (startPage > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startPage).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = paginatedResults;
