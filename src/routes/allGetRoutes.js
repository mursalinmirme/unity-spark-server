import { get } from "mongoose";
import { app } from "../app.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import users from "../models/users.js";
import jobapplications from "../models/jobapplications.js";
import verifyToken from "../jwt/middleware/auth.js";
import presentations from "../models/presentations.js";
import { json } from "express";
import events from "../models/events.js";

const allGetRoutes = () => {
  // get specific user data by _id
  app.get("/users/:email", verifyToken, async (req, res) => {
    try {
      if (req.params.email !== req.user.email) {
        res.status(403).send({ message: "Unauthorized..." });
        return;
      }
      console.log("The token user is", req.user);
      const user_email = req.params.email;
      const result = await users.findOne({ email: user_email });
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  //  get all users
  app.get("/users", verifyToken, async (req, res) => {
    try {
      const userEmail = req.user.email;
      const getUserRole = await users.findOne(
        { email: userEmail },
        { role: 1, _id: 0 }
      );
      if (getUserRole.role !== "admin") {
        res.status(403).send({ massege: "Unauthorized..." });
        return;
      }
      const result = await users.find();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  //  get all employee
  app.get("/employees", verifyToken, async (req, res) => {
    try {
      const userEmail = req.user.email;
      const getUserRole = await users.findOne(
        { email: userEmail },
        { role: 1, _id: 0 }
      );
      if (getUserRole.role !== "admin") {
        res.status(403).send({ message: "Unauthorized..." });
        return;
      }
      const result = await users.find({ role: "employee" });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get get featured jobs for home section
  app.get("/featured-jobs", async (req, res) => {
    try {
      const result = await await jobAds
        .find({})
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(3);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get all job documents numbers ads list number for manage adds
  app.get("/total-job-ads-numbers", async (req, res) => {
    try {
      const searchVal = req.query.searchVal;
      if (searchVal !== "null") {
        const result = await jobAds
          .find({ job_title: searchVal })
          .countDocuments();
        return res.send({ total: result });
      }
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
      const searchVal = req.query.searchVal;
      console.log("job ads search value is", searchVal);
      if (searchVal !== "null") {
        const result = await await jobAds
          .find({ job_title: searchVal })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(6);
        return res.send(result);
      }
      const result = await await jobAds
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(6);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get all jobs documents number for available page
  app.get("/available-total-jobs-numbers", async (req, res) => {
    try {
      const skip = req.query.skip;
      const searching = req.query.searching;
      const getSortDate = req.query.sortdate;
      const sortDate = parseInt(getSortDate);
      const jobtypes = req.query.jobtypes;
      const worktype = req.query.worktype;
      if (searching !== "null") {
        const result = await jobAds
          .find({ job_title: searching })
          .countDocuments();
        res.send({ total: result });
        return;
      }
      if (getSortDate !== "null") {
        const startDate = new Date(new Date() - sortDate * 24 * 60 * 60 * 1000);
        const isoFormattedStartDate = startDate.toISOString();
        const result = await jobAds
          .find({ createdAt: { $gte: isoFormattedStartDate } })
          .countDocuments();
        res.send({ total: result });
        return;
      }
      if (jobtypes !== "null") {
        const result = await jobAds
          .find({ job_category1: jobtypes })
          .countDocuments();
        res.send({ total: result });
        return;
      }
      if (worktype !== "null") {
        const result = await jobAds
          .find({ job_category2: worktype })
          .countDocuments();
        res.send({ total: result });
        return;
      }
      const result = await jobAds.find().countDocuments();
      res.send({ total: result });
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

      if (searching !== "null") {
        const result = await jobAds
          .find({ job_title: searching })
          .sort({ _id: -1 })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(6);
        res.send(result);
        return;
      }
      if (getSortDate !== "null") {
        const startDate = new Date(new Date() - sortDate * 24 * 60 * 60 * 1000);
        const isoFormattedStartDate = startDate.toISOString();
        const result = await jobAds
          .find({ createdAt: { $gte: isoFormattedStartDate } })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(6);
        res.send(result);
        return;
      }
      if (jobtypes !== "null") {
        const result = await jobAds
          .find({ job_category1: jobtypes })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(6);
        res.send(result);
        return;
      }
      if (worktype !== "null") {
        const result = await jobAds
          .find({ job_category2: worktype })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(6);
        res.send(result);
        return;
      }
      const result = await jobAds
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(6);
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

  // get all feedbacks numbers from numbers
  app.get("/feedbacks-nums", async (req, res) => {
    try {
      const result = await feedback.countDocuments();
      res.send({ total: result });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get all feedback list from employers
  app.get("/feedbacks", async (req, res) => {
    try {
      const skiped = req.query.skip;
      const result = await feedback
        .find()
        .sort({ _id: -1 })
        .skip(skiped)
        .limit(8);
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get user role when he/she will login our website
  app.get("/user-role", async (req, res) => {
    try {
      const userEmail = req.query.email;
      const getUserRole = await users.findOne(
        { email: userEmail },
        { role: 1, _id: 0 }
      );
      res.send(getUserRole);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // getting job applications data based on id
  app.get("/job_applications/:id", async (req, res) => {
    const id = req.params.id;
    const result = await jobapplications.findOne({ _id: id });
    res.send(result);
  });
  // getting job applications all data
  app.get("/job_applications_nums", async (req, res) => {
    const result = await jobapplications.find().countDocuments();
    res.send({ total: result });
  });
  // getting job applications all data
  app.get("/job_applications", async (req, res) => {
    const skipFrom = req.query.skip;
    console.log("skip from", skipFrom);
    const result = await jobapplications.find().skip(skipFrom).limit(6);
    res.send(result);
  });

  // check employees presentation
  app.get("/presentation/:email", async (req, res) => {
    const presenterEmail = req.params.email;
    const result = await presentations
      .find({ email: presenterEmail }, { name: 0, email: 0 })
      .sort({ presentedAt: -1 })
      .skip(0)
      .limit(1);
    res.send(result[0]);
  });
  // check employees total presentation
  app.get("/presentation", async (req, res) => {
    const email = req.query.email;
    const result = await presentations.find({ email: email }).countDocuments();
    res.send({ total: result });
  });

  app.get("/events", async (req, res) => {
    try {
      const result = await events.find();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
}; //ending all get routes brackets

export default allGetRoutes;
