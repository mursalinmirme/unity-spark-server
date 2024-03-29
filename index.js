import dotenv from "dotenv"
import dbConnect from "./src/db/dbConnect.js";
import { app } from "./src/app.js";
const port = process.env.PORT || 5000;

dotenv.config({
    path: './.env'
})

// database connection function call
dbConnect()
.then(() => {
    app.listen(port, async () => {
        console.log(`The server is running on port ${port}`);
    })
})
.catch(() => {
    console.log("Database Connection Failed!");
})