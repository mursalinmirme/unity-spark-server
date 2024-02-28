const mongoose = require("mongoose");


const commentsSchema = mongoose.Schema({
  commentTxt: {
    type: String,
    require: true,
  },
  blogId: {
    type: String,
    require: true
  },
  commenterInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const comments = mongoose.model("comments", commentsSchema);
module.exports = comments;
