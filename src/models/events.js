const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  starting_time: {
    type: String,
    required: true,
  },
  ending_time: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const events = mongoose.model("events", eventSchema);
module.exports = events;
