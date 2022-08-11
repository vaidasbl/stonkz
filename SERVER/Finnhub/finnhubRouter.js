const express = require("express");
const cors = require("cors");
const finnhub = require("finnhub");
const { response } = require("express");
const { Log } = require("../Log/log");

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

router.post("/company/history", (req, res) => {
  try {
    finnhubClient.stockCandles(
      req.body.symbol,
      req.body.resolution,
      req.body.dateFrom,
      req.body.dateTill,
      (error, data, response) => {
        const logEntry = new Log({
          company: req.body.symbol,
          stockData: data,
          dateRange: `${new Date(req.body.dateFrom * 1000).toLocaleDateString(
            "en-US"
          )} - ${new Date(req.body.dateTill * 1000).toLocaleDateString(
            "en-US"
          )}`,
          eventDate: dateNow(),
        });
        logEntry.save();
        res.send(data);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/log", async (req, res) => {
  try {
    const logs = Log.find();
    res.send(logs);
  } catch (err) {
    res.status(400).send(err);
  }
});

const dateNow = () => {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

module.exports = router;
