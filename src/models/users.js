import mongoose from "mongoose"
    
// users schema making
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    image: {
        type: String,
        require: true,
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
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// users model making
const users = mongoose.model("Users", usersSchema)

export default users;
    


