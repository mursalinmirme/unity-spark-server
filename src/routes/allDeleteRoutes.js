import { app } from "../app.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";

const allDeleteRoutes = () => {
  // job application delete
  app.delete("/job_applications/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const result = await jobapplications.deleteOne({ _id: id });
    res.send(result);
  });

  app.delete("/job-ads/:id", async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await jobAds.deleteOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
};

export default allDeleteRoutes;
