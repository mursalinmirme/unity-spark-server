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
import leaves from "../models/leaves.js";
import saveJobInfo from "../models/SaveJobInfo.js";
import tasks from "../models/tasks.js";
import blogs from "../models/blogs.js";
import req_events from "../models/requestevents.js";
import comments from "../models/comments.js";
import courses from "../models/courses.js";
import interviews from "../models/interviews.js";
import myCourse from "../models/mycourse.js";
import chat from "../models/chats.js";
import paymentInfo from "../models/payment.js";

const allGetRoutes = () => {
  // get all users
  app.get("/users/count", async (req, res) => {
    const result = await users.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result[0]);
  });
  // get specific user data by _id
  app.get("/users/:email", verifyToken, async (req, res) => {
    try {
      if (req.params.email !== req.user.email) {
        res.status(403).send({ message: "Unauthorized..." });
        return;
      }
      // console.log("The token user is", req.user);
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

  // get All Admin

  app.get("/all-admins", async (req, res) => {
    try {
      const allAdmin = await users.find({ role: "admin" });
      res.send(allAdmin);
    } catch (error) {
      console.log(error);
    }
  });

  // get all employee count
  app.get("/employee/count", async (req, res) => {
    const result = await users.aggregate([
      {
        $match: {
          role: "employee",
        },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result[0]);
  });

  //  get all employee
  app.get("/employees", verifyToken, async (req, res) => {
    try {
      console.log("checking in employee", req.user);
      const userEmail = req?.user?.email;
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

  app.get("/all-employees", verifyToken, async (req, res) => {
    try {
      console.log("checking in employee", req.user);
      const userEmail = req?.user?.email;
      const getUserRole = await users.findOne(
        { email: userEmail },
        { role: 1, _id: 0 }
      );
      const result = await users.find({ role: "employee" });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get featured jobs for home section dkjfkd
  // get all jobads
  app.get("/availableJobs/count", async (req, res) => {
    const result = await jobAds.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result[0]);
  });
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
      // console.log("job ads search value is", searchVal);
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

  // get job details info for apply page
  app.get("/my-applyjobs/:id", async (req, res) => {
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
      const jobTitle = req.query.job_title;
      const jobId = req.query.jobId;
      // console.log("similar jobs wanted by", similarJobs);
      const result = await jobAds
        .find({ job_title: jobTitle, _id: { $ne: jobId } })
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

  // get all feedback for testimonials
  app.get("/all-feedback", async (req, res) => {
    try {
      const result = await feedback.find();
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
  // get current loged in user id
  app.get("/user-id", async (req, res) => {
    try {
      const userEmail = req.query.email;
      const getUserId = await users.findOne({ email: userEmail }, { _id: 1 });
      res.send(getUserId);
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
  // getting job applications all data
  app.get("/job_applications", async (req, res) => {
    const skipFrom = req.query.skip;
    // console.log("skip from", skipFrom);
    const result = await jobapplications
      .find({ status: "Pending" })
      .skip(skipFrom)
      .limit(6);
    // const result = await jobapplications.find().populate('user').skip(skipFrom).limit(6);
    res.send(result);
  });
  // getting job applications all data
  app.get("/job_applicants_nums", async (req, res) => {
    const result = await jobapplications
      .find({ status: "Confirmed" })
      .countDocuments();
    res.send({ total: result });
  });
  // getting job applications all data
  app.get("/job_applicants", async (req, res) => {
    const skipFrom = req.query.skip;
    // console.log("skip from", skipFrom);
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
      res.status(500).send(error.message);
    }
  });
  app.get("/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await events.findOne({ _id: id });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // getting event under email

  app.get("/reqEvents/:email", async (req, res) => {
    try {
      const reqeventEmail = req.params.email;
      const result = await req_events.find({ reqeventEmail: reqeventEmail });
      // console.log("ho testing",result);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get all leave request
  app.get("/leaves", async (req, res) => {
    try {
      const result = await leaves.find({ status: "Pending" }).populate("user");
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
    }
  });
  // get all rejected leave request
  app.get("/leaves-rejected", async (req, res) => {
    try {
      const result = await leaves.find({ status: "Rejected" }).populate("user");
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get a total Leaves Rest Days

  app.get("/total-rest/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await leaves.find({ email: email, status: "Confirmed" });
      // console.log("Songtt", result);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get a specific leave request

  // get all task
  app.get("/tasks", async (req, res) => {
    try {
      const result = await tasks.find();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // get specific task
  app.get("/tasks/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await tasks.findOne({ _id: id });
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // get Employee all Attendance

  app.get("/total-attendance/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await presentations.find({ email: email });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get specific data Save Data Get

  app.get("/getSaveInfo/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await saveJobInfo.find({ email: email });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // getting all of the blogs
  app.get("/blogs", async (req, res) => {
    try {
      const result = await blogs
        .find({ status: "Accepted" })
        .sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // getting three blogs only
  app.get("/top-blogs/:id", async (req, res) => {
    try {
      const currentId = req.params.id;
      console.log("current", currentId);
      const result = await blogs
        .find({ _id: { $ne: currentId } })
        .skip(0)
        .limit(2);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  // getting user added blogs data
  app.get("/employee-blogs/:email", async (req, res) => {
    try {
      const bloggerEmail = req.params.email;
      const result = await blogs.find({ bloggerEmail: bloggerEmail });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get a individual blogs for blog details page
  app.get("/blogs/:id", async (req, res) => {
    try {
      const blogsId = req.params.id;
      const result = await blogs
        .findOne({ _id: blogsId })
        .populate("bloggerInfo");
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // task management get employee running tasks
  app.get("/my-running-task/:email", async (req, res) => {
    try {
      const employeeEmail = req.params.email;
      const result = await tasks.findOne({
        "employees.email": employeeEmail,
        status: "running",
      });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // task management get employee running tasks
  app.get("/my-recent-complete-task/:email", async (req, res) => {
    try {
      const employeeEmail = req.params.email;
      const result = await tasks.find({
        "employees.email": employeeEmail,
        status: "complete",
      });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // task management get employee running tasks
  app.get("/my-total-task-completed/:email", async (req, res) => {
    try {
      const employeeEmail = req.params.email;
      const result = await tasks
        .find({
          "employees.email": employeeEmail,
          status: "complete",
        })
        .countDocuments();
      console.log("documentCOunt resutlis", result);
      res.send({ count: result });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get pending blogs
  app.get("/pendingBlogs", async (req, res) => {
    try {
      const result = await blogs
        .find({ status: "Pending" })
        .populate("bloggerInfo");
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });
  // get specific a details
  app.get("/blog-details/:id", async (req, res) => {
    try {
      const blogId = req.params.id;
      const result = await blogs
        .findOne({ _id: blogId })
        .populate("bloggerInfo");

      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get specific a details
  app.get("/my-applications", async (req, res) => {
    try {
      const userEmail = req.query.email;
      const result = await jobapplications.find({ email: userEmail });
      res.send(result);
    } catch (error) {
      res.status(500).send("Something went wrong.");
    }
  });

  // get a specific blog id comments
  app.get("/comments/:id", async (req, res) => {
    try {
      const blogId = req.params.id;
      const result = await comments
        .find({ blogId: blogId })
        .populate("commenterInfo")
        .sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/courses", async (req, res) => {
    try {
      const result = await courses.find().sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  //  git all interview information
  app.get("/get-admin-interview/:email", async (req, res) => {
    try {
      const interViewerEmail = req.params.email;
      const result = await interviews
        .find({ interViewerEmail: interViewerEmail })
        .sort({ createdAt: -1 });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // git on interveiw calling page interview

  app.get("/get-user-interview/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await interviews.findOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get user
  app.get("/user-interview/:email", async (req, res) => {
    try {
      const candidateEmail = req.params.email;

      const result = await interviews.findOne({
        candidateEmail: candidateEmail,
      });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // get interview details for admin
  app.get("/interviewDetails/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await interviews.findOne({ _id: id });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // MY COURSE getting api

  app.get("/my_course/:email", async (req, res) => {
    console.log("checking working or not");
    try {
      const userEmail = req.params.email;
      const result = await myCourse
        .find({ userEmail: userEmail })
        .populate("uniqueID");
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // get all chats
  app.get("/chat", async (req, res) => {
    try {
      const senderEmail = req.query.sender_email
      const recieverEmail = req.query.reciever_email
      const result = await chat
      .find({
        $or: [
          { sender: senderEmail, reciever: recieverEmail },
          { sender: recieverEmail, reciever: senderEmail }
        ]
      })
      .sort({ createdAt: -1 });;
        res.send(result);
      }
      catch (error) {
        res.status(500).send(error.message);
      }
  })

  // get all chat-friends
  app.get('/chat-friends/:email', async (req, res) => {
    try {
      const email = req.params.email
      const result = await chat
      .find({
        $or: [
          { sender: email },
          { reciever: email }
        ]
      },
      {
        sender: 1, reciever: 1, _id: 0
      })
      .sort({ createdAt: -1 });;
      const emails = new Set();
      result.forEach((message) => {
          emails.add(message.sender);
          emails.add(message.reciever);
      });
      res.send(Array.from(emails));
    }
    catch (error) {
      res.status(500).send(error.message);
    }
  })

  // getting enrolled course email count
  app.get("/enrolled_course_length/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await myCourse.aggregate([
        {
          $match: {
            userEmail: email,
          },
        },
        {
          $group: {
            _id: "$userEmail",
            count: { $sum: 1 },
          },
        },
      ]);

      if (result.length === 0) {
        res.json({ _id: email, count: 0 });
      } else {
        res.json(result[0]);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // get payment details
  app.get("/payment-details", async (req, res) => {
    try {
      const result = await paymentInfo.find();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // does the applicant already applied the specific job check
  app.get("/does-user-applied", async (req, res) => {
    try {
      const applied_jobs_id = req.query.applied_jobs_id;
      const email = req.query.email;
      console.log("does I got both items query", applied_jobs_id, email);
      const result = await jobapplications
        .findOne({ applied_job_id: applied_jobs_id, email: email })
        .countDocuments();
      console.log(result);
      res.send({ applied: result });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}; //ending all get routes brackets

export default allGetRoutes;
