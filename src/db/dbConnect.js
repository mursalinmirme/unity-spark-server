const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
       await mongoose.connect('mongodb+srv://unity-spark:uebc6RYNp2FcXIvP@cluster0.vbzggtn.mongodb.net/?retryWrites=true&w=majority', {dbName: 'unity-spark'});
       console.log("Database connected!");
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
    }
}

module.exports = dbConnect