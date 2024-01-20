const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
       await mongoose.connect('mongodb+srv://unity-spark:uebc6RYNp2FcXIvP@cluster0.vbzggtn.mongodb.net/?retryWrites=true&w=majority');
       console.log("Database is connected successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
    }
}

module.exports = dbConnect