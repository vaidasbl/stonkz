const mongoose = require("mongoose");
const express = require("express");
const app = express();

const finnhubRouter = require("./Finnhub/finnhubRouter");
app.use("/api/finnhub", finnhubRouter);

app.use(express.json());
app.use(express.static("CLIENT/build"));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/stonkzdb")
  .then(() => console.log("connected to stonkzdb"))
  .catch((err) => console.error("failed to connect to stronkzdb", err));
