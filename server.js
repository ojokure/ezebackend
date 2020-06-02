require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/", (req, res) => {
  res.send("<h1> Working... </h1>");
});

module.exports = server;
