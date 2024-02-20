import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sender: {
        type: String,
        require: true
    }
})