const express = require("express");
const cors = require("cors");
const finnhub = require("finnhub");
const { response } = require("express");
const { Log } = require("../Log/log");
const axios = require("axios");
const fs = require("fs");

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
    const logs = await Log.find();
    res.send(logs.reverse());
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/log/p=:page/s=:size", async (req, res) => {
  try {
    const log = await Log.find();
    const logSize = log.length;
    const pageNum = req.params.page;
    const pageSize = req.params.size;

    page = log
      .reverse()
      .slice(pageNum * pageSize - pageSize, pageNum * pageSize);

    res.send({ page: page, size: logSize });
  } catch (err) {
    res.send(err);
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

const text = async () => {
  try {
    const result = await axios.get(
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cbokdjiad3i94d2lbp80"
    );
    console.log("writing start");
    var stream = fs.createWriteStream("append.txt", { flags: "a" });
    result.data.forEach((i) =>
      stream.write('{symbol: "' + i.symbol + '"},' + "\n")
    );
    stream.end();
    console.log("writing end");
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
