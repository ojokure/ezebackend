const express = require("express");
const router = express.Router();
const SellRequest = require("../Models/sell_request_model");
const readXlsxFile = require("read-excel-file/node");

router.get("/", async (req, res) => {
  // hold data to insert in DB for table BUY
  const buyData = {};
  // names for each DB field
  let headers = [];
  try {
    readXlsxFile("./Models/trade_request.xlsx", { sheet: "IPHONES" }).then(
      (rows) => {
        // 0-9 column indexes of table 1 - buy
        // >9 column indexes of table 2 - sell

        // determines if we have a new phone
        let hasPhone = false;
        let currentPhone = null;
        let hasHeaders = false;
        rows.forEach((row, r) => {
          // skip first row - pointless data
          if (r == 0) return false;
          // buy table
          // if we dont have a phone
          // next row will have a phone
          // and save it, go to next row
          if (!hasPhone) {
            hasPhone = true;
            currentPhone = row[0];
            buyData[currentPhone] = [];
            return false;
            // if we dont have headers yet
            // save those, and go to next row
          } else if (!hasHeaders) {
            hasHeaders = true;
            headers = row;
            return false;
            // if it is not headers or a phone, then
            // it's data -> so save it
          } else {
            // if the next row is a new phone
            if (
              rows.length > r + 1 &&
              rows[r + 1][0] != null &&
              rows[r + 1][0] != "Unlocked"
            ) {
              // reset phone - so that on the row
              // it goes to line 31
              hasPhone = false;
              hasHeaders = false;
            }
            // this is where we save all the data
            buyData[currentPhone] = [
              ...buyData[currentPhone],
              headers.reduce((save, header, i) => {
                if (header != null) {
                  return { ...save, [header]: row[i] };
                }
                return save;
              }, {}),
            ];
          }
        });
        console.log("data", buyData);
        res.json(buyData);
      }
    );
    // TODO: save in DB using variable buyData
    // TODO: process data for SELL table
    // res.json(buyData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
