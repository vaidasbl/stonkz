const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Journal = mongoose.model("Journal", JournalSchema);

module.exports.Journal = Journal;
