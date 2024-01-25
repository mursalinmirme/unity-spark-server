import { app } from "../app.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import users from "../models/users.js";

const allGetRoutes = () => {
  // get specific user data by _id
  app.get("/users/:email", async (req, res) => {
    try {
      const user_email = req.params.email;
      const result = await users.findOne({ email: user_email });
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get get featured jobs for home section
  app.get("/featured-jobs", async (req, res) => {
    try {
      const result = await await jobAds
        .find()
        .sort({ _id: -1 })
        .skip(0)
        .limit(3);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get all job ads list number
  app.get("/total-job-ads-numbers", async (req, res) => {
    try {
      const result = await jobAds.countDocuments();
      res.send({ total: result });
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });
  // get all job ads list
  app.get("/total-job-ads", async (req, res) => {
    try {
      const skip = req.query.skip;
      const result = await await jobAds
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(5);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // searching and sorting available jobs pates api routes
  app.get("/job-ads", async (req, res) => {
    try {
      const skip = req.query.skip;
      const searching = req.query.searching;
      const getSortDate = req.query.sortdate;
      const sortDate = parseInt(getSortDate);
      const jobtypes = req.query.jobtypes;
      const worktype = req.query.worktype;
      console.log("the job types is", typeof jobtypes);
      console.log("Sort date is", typeof sortDate);
      if (searching !== "null") {
        const result = await jobAds
          .find({ job_title: searching })
          .sort({ _id: -1 });
        res.send(result);
        return;
      }
      if (sortDate > 0) {
        const startDate = new Date(new Date() - sortDate * 24 * 60 * 60 * 1000);
        const isoFormattedStartDate = startDate.toISOString();
        const result = await jobAds
          .find({ createdAt: { $gte: isoFormattedStartDate } })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(5);
        res.send(result);
        return;
      }
      if (jobtypes !== "null") {
        const result = await jobAds
          .find({ job_category1: jobtypes })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(5);
        res.send(result);
        return;
      }
      if (worktype !== "null") {
        const result = await jobAds
          .find({ job_category2: worktype })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(5);
        res.send(result);
        return;
      }
      const result = await jobAds.find().sort({ _id: -1 }).skip(skip).limit(5);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get specific a job ads details
  app.get("/job-ads/:id", async (req, res) => {
    try {
      const jobAdsId = req.params.id;
      const result = await jobAds.findOne({ _id: jobAdsId });
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get similar jobs based on job details page job type
  app.get("/similar_jobs", async (req, res) => {
    try {
      const similarJobs = req.query.jobtype;
      console.log("similar jobs wanted by", similarJobs);
      const result = await jobAds
        .find({ job_category1: similarJobs })
        .skip(0)
        .limit(3);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get all feedback list from employers
  app.get("/feedbacks", async (req, res) => {
    try {
      const result = await feedback.find().sort({ _id: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get user role when he/she will login our website
  app.get("/user-role", async (req, res) => {
    const userEmail = req.query.email;
    const getUserRole = await users.findOne(
      { email: userEmail },
      { role: 1, _id: 0 }
    );
    res.send(getUserRole);
  });
}; //ending all get routes brackets

export default allGetRoutes;
