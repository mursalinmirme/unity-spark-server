import mongoose from "mongoose";

const leavesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    numberOfDays: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    hrEmail: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    leaveReason: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    feedback: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const leaves = mongoose.model("leaves", leavesSchema);
export default leaves;