import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true,
    
  //   validate: {
  //       validator: async function (value) {
  //         // Validate image type
  //         const type = imageType(Buffer.from(value, "base64"));
  //         if (!type || !["png", "jpg", "jpeg", "gif"].includes(type.ext)) {
  //           throw new Error(
  //             "Invalid image type. Supported types: png, jpg, jpeg, gif"
  //           );
  //         }
  
  //         return true; // Validation passed
  //       },
  //       message: "Image data is invalid or missing",
  //   },
  // },
  },
  description: {
    type: String,
    require: true 
  },
  instructor_name: {
    type: String,
    require: true 
  },
  instructor_img: {
    type: String,
    require: true 
  },
  instructor_bio: {
    type: String,
    require: true 
  },
  intro: {
    type: String,
    require: true 
  },
  certificate: {
    type: String,
    require: true 
  },
  course_feature: {
    type: Array,
    require: true 
  },
  benefits: {
    type: Array,
    require: true 
  },
  course_content: {
    type: Array,
    require: true 
  },
  slag:{
    type: String,
    require: true
  }
});

const courses = mongoose.model("courses", coursesSchema);
export default courses;
