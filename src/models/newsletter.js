const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const Newsletters = mongoose.model("NewsLetters", newsletterSchema);
module.exports = Newsletters