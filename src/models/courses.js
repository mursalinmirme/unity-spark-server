import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
    require: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
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
  details: {
    type: String,
    require: true
  },
});

const courses = mongoose.model("courses", coursesSchema);
export default courses;
