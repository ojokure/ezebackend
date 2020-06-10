require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Buy Request Endpoint
const buyRouter = require("./Routes/buy");

// Sell Request Endpoint
const sellRouter = require("./Routes/sell");

// Import Endpoint
const importRouter = require("./Routes/import");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", async () => {
  console.log("connected to database");
  // if ((await User.countDocuments().exec()) > 0) return;
});

server.use("/buy", buyRouter);
server.use("/sell", sellRouter);
server.use("/import", importRouter);

server.use("/", (req, res) => {
  res.send("<h1> Working... </h1>");
});

module.exports = server;
