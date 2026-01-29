const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,  // store username for easy display
  message: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
