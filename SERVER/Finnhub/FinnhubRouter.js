const express = require("express");
const cors = require("cors");
const finnhub = require("finnhub");
const { Log } = require("../Log/Log");
const axios = require("axios");
const fs = require("fs");

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: "*" }));

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cbokdjiad3i94d2lbp80";
const finnhubClient = new finnhub.DefaultApi();

router.post("/company", (req, res) => {
  try {
    const symbol = req.body.symbol;
    if (symbol === null || symbol === "" || symbol === undefined) {
      res.status(400).send("Enter the company symbol!");
      return;
    }

    finnhubClient.companyProfile2(
      { symbol: symbol },
      (error, data, response) => {
        if (isEmpty(data)) {
          res.status(400).send(`Data for company '${symbol}' was not found.`);
          return;
        }
        res.send(data);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/company/stocks", (req, res) => {
  try {
    if (req.body.dateFrom > req.body.dateTill) {
      res.status(400).send("Date from must be earlier than date till!");
      return;
    }

    finnhubClient.stockCandles(
      req.body.symbol,
      req.body.resolution,
      req.body.dateFrom,
      req.body.dateTill,
      (error, data, response) => {
        addToLog(req.body, data);
        if (data.s === "no_data") {
          res.status(400).send("No stock data found.");
          return;
        }
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

router.post("/log/filter", async (req, res) => {
  try {
    const log = await Log.find({
      $or: [
        { eventDate: new RegExp(`.*${req.body.filter}.*`, "i") },
        { company: new RegExp(`.*${req.body.filter}.*`, "i") },
      ],
    });
    const logSize = log.length;
    const pageNum = req.body.page;
    const pageSize = req.body.size;

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

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const addToLog = (body, data) => {
  const logEntry = new Log({
    company: body.symbol.toUpperCase(),
    stockData: data,
    dateRange: `${new Date(body.dateFrom * 1000).toLocaleDateString(
      "en-US"
    )} - ${new Date(body.dateTill * 1000).toLocaleDateString("en-US")}`,
    eventDate: dateNow(),
  });
  logEntry.save();
};

const symbolsGenerator = async () => {
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
