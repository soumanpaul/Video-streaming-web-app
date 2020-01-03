const mongoose = require("mongoose");
const crypto = require("crypto");

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required"
  },
  description: String,
  genre: String,
  views: { type: Number, default: 0 },
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model("Media", MediaSchema);
