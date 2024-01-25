import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
     image: {
        type: String,
        required: true,
    },
    employeePosition: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    feedbackCreatedAt: {
        type: Date,
        default: Date.now
    }
    
})

const feedback = mongoose.model('feedbacks', feedbackSchema);

export default feedback