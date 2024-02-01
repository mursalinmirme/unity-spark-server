import mongoose from "mongoose";

const applyJobSchema = mongoose.Schema({
  job_title: {
    type: String,
    require: true,
    trim: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: async function (value) {
        // Validate image type
        const type = imageType(Buffer.from(value, "base64"));
        if (!type || !["png", "jpg", "jpeg", "gif"].includes(type.ext)) {
          throw new Error(
            "Invalid image type. Supported types: png, jpg, jpeg, gif"
          );
        }

        return true; // Validation passed
      },
      message: "Image data is invalid or missing",
    },
  },
  applied_job_id: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  current_address: {
    type: String,
    require: true,
  },
  permanent_address: {
    type: String,
    require: true,
  },
  institute_name: {
    type: String,
    require: true,
  },
  education_level: {
    type: String,
    require: true,
  },
  skills: {
    type: Array,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  resume_link: {
    type: String,
    require: true,
  },
});

const applyJob = mongoose.model("apply-job", applyJobSchema);

export default applyJob;
