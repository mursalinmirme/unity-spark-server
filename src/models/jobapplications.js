import mongoose from "mongoose";
const jobApplicationsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  applied_job_id: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  skills: {
    type: Array,
    require: true,
  },
  current_address: {
    type: String,
    require: true,
    trim: true,
  },
  permanent_address: {
    type: String,
    require: true,
    trim: true,
  },
  age: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
    trim: false,
  },
  education_level: {
    type: String,
    require: true,
    trim: true,
  },
  institute_name: {
    type: String,
    require: true,
    trim: true,
  },
  resume: {
    type: String,
    require: true,
    trim: false,
  },
  image: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// job applications model making

const jobapplications = mongoose.model(
  "job_applications",
  jobApplicationsSchema
);

export default jobapplications;
