const mongoose = require("mongoose");

const likedBlogsSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  blogId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const likedBlogs = mongoose.model("likedBlogs", likedBlogsSchema);

module.exports = likedBlogs;
