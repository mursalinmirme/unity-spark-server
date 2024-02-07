import { app } from "../app.js";
import saveJobInfo from "../models/SaveJobInfo.js";
import events from "../models/events.js";
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

  // Event delete
  app.delete("/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await events.deleteOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // Saved Jobs delete
  app.delete("/saveJobs/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await saveJobInfo.deleteOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
};

export default allDeleteRoutes;
