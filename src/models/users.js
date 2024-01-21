import mongoose from "mongoose"
    
// users schema making
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    image: {
        type: String,
        require: true
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
    


