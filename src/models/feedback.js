import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
        trim: true,
        unique: true,

    },
     image: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                // Validate image type
                const type = imageType(Buffer.from(value, 'base64'));
                if (!type || !['png', 'jpg', 'jpeg', 'gif'].includes(type.ext)) {
                    throw new Error('Invalid image type. Supported types: png, jpg, jpeg, gif');
                }

                // Validate image size (3 megabytes)
                const maxSizeBytes = 3 * 1024 * 1024; // 3 megabytes
                if (Buffer.from(value, 'base64').length > maxSizeBytes) {
                    throw new Error('Image size must be smaller than 3 megabytes');
                }

                return true; // Validation passed
            },
            message: 'Image data is invalid or missing',
        },
    },
    employeePosition: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
    },
    currentStatus: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
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