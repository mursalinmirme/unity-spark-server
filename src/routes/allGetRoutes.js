import { app } from "../app.js";
import verifyToken from "../jwt/middleware/auth.js";
import saveJobInfo from "../models/SaveJobInfo.js";
import events from "../models/events.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import leaves from "../models/leaves.js";
import presentations from "../models/presentations.js";
import tasks from "../models/tasks.js";
import users from "../models/users.js";

const allGetRoutes = () => {
  // get specific user data by _id
  app.get("/users/:email", verifyToken, async (req, res) => {
    try {
      if (req.params.email !== req.user.email) {
        res.status(403).send({ message: "Unauthorized..." });
        return;
      }
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
    }
  });

  // get all job ads list
  app.get("/total-job-ads", async (req, res) => {
    try {
      const skip = req.query.skip;
      const searchVal = req.query.searchVal;
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
    }
  });

  // get specific a job ads details
  app.get("/job-ads/:id", async (req, res) => {
    try {
      const jobAdsId = req.params.id;
      const result = await jobAds.findOne({ _id: jobAdsId });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get similar jobs based on job details page job type
  app.get("/similar_jobs", async (req, res) => {
    try {
      const similarJobs = req.query.jobtype;
      const result = await jobAds
        .find({ job_category1: similarJobs })
        .skip(0)
        .limit(3);
      res.send(result);
    } catch (error) {
      res.status(500).send(error?.message);
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
      res.status(500).send(error.message);
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
    const result = await jobapplications
      .find({ status: "Pending" })
      .countDocuments();
    res.send({ total: result });
  });
  // getting job applicants total number
  app.get("/job_applicants_nums", async (req, res) => {
    const result = await jobapplications
      .find({ status: "Confirmed" })
      .countDocuments();
    res.send({ total: result });
  });
  // getting job applications all data
  app.get("/job_applications", async (req, res) => {
    const skipFrom = req.query.skip;
    const result = await jobapplications
      .find({ status: "Pending" })
      .skip(skipFrom)
      .limit(6);
    // const result = await jobapplications.find().populate('user').skip(skipFrom).limit(6);
    res.send(result);
  });
  // getting all manage applicants
  app.get("/job_applicants", async (req, res) => {
    const skipFrom = req.query.skip;
    const result = await jobapplications
      .find({ status: "Confirmed" })
      .skip(skipFrom)
      .limit(6);
    // const result = await jobapplications.find().populate('user').skip(skipFrom).limit(6);
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
  // get all events
  app.get("/events", async (req, res) => {
    try {
      const result = await events.find();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
  app.get("/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await events.findOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get all leave request
  app.get("/leaves", async (req, res) => {
    try {
      const result = await leaves.find({ status: "Pending" }).populate("user");
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
  // get all confiremed leave request
  app.get("/leaves-confirmed", async (req, res) => {
    try {
      const result = await leaves
        .find({ status: "Confirmed" })
        .populate("user");
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
  // get all rejected leave request
  app.get("/leaves-rejected", async (req, res) => {
    try {
      const result = await leaves.find({ status: "Rejected" }).populate("user");
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get a total Leaves Rest Days

  app.get("/total-rest/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await leaves.find({ email: email, status: "Confirmed" });
      console.log("Songtt", result);
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get a specific leave request

  // get all task
  app.get("/tasks", async (req, res) => {
    try {
      const result = await tasks.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

  // get Employee all Attendance

  app.get("/total-attendance/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await presentations.find({ email: email });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get indivisual user all application
  app.get("/my-applications", async (req, res) => {
    try {
      const email = req.query.email;
      const result = await jobapplications
        .find({ email: email })
        .sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // get all saved applications under a user
  app.get("/getSaveInfo/:email", async (req, res) => {
    try {
      const userEmail = req.params.email;
      const result = await saveJobInfo.find({ email: userEmail });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get indivisual user all application
  app.get("/my-applications", async (req, res) => {
    try {
      const email = req.query.email;
      const result = await jobapplications
        .find({ email: email })
        .sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get leave requests of individual user

  app.get("/leaves/:email", async (req, res) => {
    try {
      const userEmail = req.params.email;
      const result = await leaves.find({ email: userEmail });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });
}; //ending all get routes brackets

export default allGetRoutes;
