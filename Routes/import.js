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
          // sell table
          // if we dont have a phone, next row will have a phone so save it, go to next row
          if (!hasPhone) {
            hasPhone = true;
            currentPhone = row[0];
            buyData[currentPhone] = [];
            return false;
            // if we dont have headers yet save those, and go to next row
          } else if (!hasHeaders) {
            hasHeaders = true;
            headers = row;
            return false;
            // if it is not headers or a phone, then  it's useful data -> so save it
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

        // converting the data to easily seed-"able" json format
        const modelName = Object.keys(buyData);
        const storageSize = buyData["iPhone XS Max"].reduce((acc, curr) => {
          acc.push(curr["Storage Size"]);
          return acc;
        }, []);
        const conditions = Object.keys(buyData["iPhone XS Max"][0]);
        conditions.splice(0, 1);
        let output = [];

        for (let i = 0; i < modelName.length; i++) {
          for (let j = 0; j < storageSize.length; j++) {
            for (let k = 0; k < conditions.length; k++) {
              const price = buyData[modelName[i]].find(
                (el) => el["Storage Size"] === storageSize[j]
              );
              if (price) {
                const newPrice = price[conditions[k]];

                output.push({
                  name: modelName[i],
                  condition: conditions[k],
                  storage: storageSize[j],
                  price: newPrice,
                });
              }
            }
          }
        }
        // Saving to the database
        for (const phone of output) {
          SellRequest.create({
            ...phone,
          });
        }

        // serve what we just saved
        res.json(output);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
