import mongoose from "mongoose";

const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.DB_URI, {dbName: 'unity-spark'});
       console.log("Database connected!");
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
    }
}

export default dbConnect