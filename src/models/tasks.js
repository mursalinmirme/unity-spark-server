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
});

const tasks = mongoose.model("tasks", taskSchema);

export default tasks;
