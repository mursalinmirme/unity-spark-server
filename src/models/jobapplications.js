import mongoose from "mongoose";
const jobApplicationsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  skils: {
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
