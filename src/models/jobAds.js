import mongoose from "mongoose";

const jobAdsSchema = mongoose.Schema({
  job_title: {
    type: String,
    require: true,
    trim: true,
  },
  job_category1: {
    type: String,
    require: true,
  },
  job_category2: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  salary: {
    type: String,
    require: true,
  },
  job_description: {
    type: String,
    require: true,
  },
  required_Skills: {
    type: Array,
    required: true,
  },
  additional_Require: {
    type: Array,
  },
  education_Require: {
    type: Array,
  },
  benefits: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const jobAds = mongoose.model("job_ads", jobAdsSchema);

export default jobAds;
