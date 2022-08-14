const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  company: String,
  stockData: {},
  dateRange: String,
  eventDate: String,
});

const Log = mongoose.model("Log", LogSchema);

module.exports.Log = Log;
