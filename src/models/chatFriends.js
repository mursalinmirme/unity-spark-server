import mongoose from "mongoose";

const chatFriendsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        require: true
    }
})

const chatFriends = mongoose.model("chatFriends", chatFriendsSchema);
export default chatFriends;