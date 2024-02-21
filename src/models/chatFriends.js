import mongoose from "mongoose";

const chatFriendsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    my_email: {
        type: String,
        require: true
    },
    friend_email: {
        type: String,
        require: true
    }
})

const chatFriends = mongoose.model("chatFriends", chatFriendsSchema);
export default chatFriends;