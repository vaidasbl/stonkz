const express = require("express");
const cors = require("cors");
const finnhub = require("finnhub");
const { response } = require("express");

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: "*" }));

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cbokdjiad3i94d2lbp80";
const finnhubClient = new finnhub.DefaultApi();

router.get("/company/:symbol", (req, res) => {
  try {
    finnhubClient.companyProfile2(
      { symbol: req.params.symbol },
      (error, data, response) => {
        res.send(data);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
