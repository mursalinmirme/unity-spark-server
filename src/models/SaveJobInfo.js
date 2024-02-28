const mongoose = require("mongoose");
// users schema making
const saveJobSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  job_category1: {
    type: String,
    require: true,
  },
  job_category2: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  applicationId: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// users model making
const saveJobInfo = mongoose.model("saveJobInfo", saveJobSchema);

module.exports = saveJobInfo;
