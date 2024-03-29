import mongoose from "mongoose";

const savedBlogsSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  blogInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const savedBlogs = mongoose.model("savedBlogs", savedBlogsSchema);

export default savedBlogs;
