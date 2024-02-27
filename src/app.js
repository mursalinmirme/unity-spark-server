const express = require("express");
const cors = require("cors");
const allUpdateRoutes = require("./routes/allUpdateRoutes.js");
const allPostRoutes = require("./routes/allPostRoutes.js");
const allGetRoutes = require("./routes/allGetRoutes.js");
const allDeleteRoutes = require("./routes/allDeleteRoutes.js");
// const cookieParser = require("cookie-parser");
const CreateToken = require("./jwt/token.js");
const sentMail = require("./shares/sentMail.js");
const payment = require("./payment/payment.js");

const app = express();
app.use(cors(
  {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "https://unity-spark-22122.web.app",
      "https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411",
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
CreateToken(app);

// call all get request
allGetRoutes(app);

// call all Post requests
allPostRoutes(app);

// sent mail post request
sentMail(app);

// call all update routes
allUpdateRoutes(app);

// call all delete routes
allDeleteRoutes(app);

// payment
payment(app);

module.exports = app;
