import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
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
  host: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const events = mongoose.model("events", eventSchema);
export default events;
