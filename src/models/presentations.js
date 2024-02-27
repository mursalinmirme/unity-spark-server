const mongoose = require("mongoose");

// users schema making
const presentationSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  presentedAt: {
    type: Date,
    default: Date.now,
  },
});

// users model making
const presentations = mongoose.model("presentations", presentationSchema);

module.exports = presentations;
