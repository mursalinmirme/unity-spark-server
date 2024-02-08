import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  task_name: {
    type: String,
    require: true,
    trim: true,
  },
  start_date: {
    type: String,
    require: true,
  },
  end_date: {
    type: String,
    require: true,
  },
  employees: {
    type: Array,
    require: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tasks = mongoose.model("tasks", taskSchema);

export default tasks;
