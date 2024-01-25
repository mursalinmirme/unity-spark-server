import { app } from "../app.js";

const allDeleteRoutes = () => {
  // checking delete routes
  app.delete("/check", async (req, res) => {
    console.log("someone hitting check routes delete data.");
  });
};

export default allDeleteRoutes;
