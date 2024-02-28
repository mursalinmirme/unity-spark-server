const mongoose = require("mongoose");

// users schema making
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [3, "minimum length of the feedback title should be 3"],
    maxlength: [100, "maximum length of the feedback title should be 10"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
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
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  current_address: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  institute_name: {
    type: String,
  },
  education_level: {
    type: String,
  },
  job_preference: {
    type: String,
  },
  time_preference: {
    type: String,
  },
  skills: {
    type: Array,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  position: {
    type: String,
    default: "guest",
  },
  salary: {
    type: String,
    default: "",
  },

  resume_link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// users model making
const users = mongoose.model("Users", usersSchema);

module.exports = users;
