import mongoose, { mongo } from "mongoose";

const blogsSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  bloggerEmail: {
    type: String,
    require: true,
  },
  bloggerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogs = mongoose.model("blogs", blogsSchema);
export default blogs;
