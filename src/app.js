import express from "express";
import cors from "cors";
import allUpdateRoutes from "./routes/allUpdateRoutes.js";
import allPostRoutes from "./routes/allPostRoutes.js";
import allGetRoutes from "./routes/allGetRoutes.js";
import allDeleteRoutes from "./routes/allDeleteRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Iniatial route 
app.get("/", (req, res) => {
    res.send("The Unity spark server is running.....");
})

// call all get request
allGetRoutes();

// call all Post requests
allPostRoutes();

// call all update routes
allUpdateRoutes();

// call all delete routes 
allDeleteRoutes();





export {app}