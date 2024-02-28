const mongoose = require("mongoose");

const interviewsSchema = mongoose.Schema({
    candidateName: {
        type: String,
        require: true
    },
    candidateEmail: {
        type: String,
        require: true
    },
    candidateImage: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    interViewerName: {
        type: String,
        require: true
    },
    interViewerEmail: {
        type: String,
        require: true
    },
    interViewerImage: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const interviews = mongoose.model("interviews", interviewsSchema);
module.exports = interviews;