
const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    term: { type: String, required: true, trim: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Search", searchSchema);
