import express from "express";
import cors from "cors";
import allUpdateRoutes from "./routes/allUpdateRoutes.js";
import allPostRoutes from "./routes/allPostRoutes.js";
import allGetRoutes from "./routes/allGetRoutes.js";
import allDeleteRoutes from "./routes/allDeleteRoutes.js";
// import cookieParser from "cookie-parser";
import CreateToken from "./jwt/token.js";
import sentMail from "./shares/sentMail.js";
import payment from "./payment/payment.js";

const app = express();
app.use(cors(
  {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:4173",
      "https://unity-spark-22122.web.app",
      "https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411"
    ],
  
  }
));
app.use(express.json());
// app.use(cookieParser());

// Iniatial route
app.get("/", (req, res) => {
  res.send("The Unity spark server is running.....");
});
// call jwt token create and remove function
CreateToken();

// call all get request
allGetRoutes();

// call all Post requests
allPostRoutes();

// sent mail post request
sentMail();

// call all update routes
allUpdateRoutes();

// call all delete routes
allDeleteRoutes();

// payment
payment();

export { app };
