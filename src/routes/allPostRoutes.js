import { app } from "../app.js";
import saveJobInfo from "../models/SaveJobInfo.js";
import blogs from "../models/blogs.js";
import events from "../models/events.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import leaves from "../models/leaves.js";
import presentations from "../models/presentations.js";
import req_events from "../models/requestevents.js";
import tasks from "../models/tasks.js";
import users from "../models/users.js";

// All Post Requests
const allPostRoutes = () => {
  // user sign up route
  app.post("/users", async (req, res) => {
    try {
      const newUser = req.body;
      const existingUser = await users.findOne({ email: newUser.email });
      if (existingUser) {
        return res.send("users already exist!");
      }
      const usersModel = new users(newUser);
      const result = await usersModel.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // job ads post
  app.post("/job-ads", async (req, res) => {
    try {
      const newJobAds = req.body;
      const jobAdsModel = new jobAds(newJobAds);
      const result = await jobAdsModel.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // post a feedback from employee
  app.post("/feedbacks", async (req, res) => {
    // post a feedback
    try {
      const newFeedback = req.body;
      const feedbackModel = new feedback(newFeedback);
      const result = await feedbackModel.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // posting job applications data
  app.post("/job_applications", async (req, res) => {
    try {
      const application_data = req.body;
      const job_application_model = new jobapplications(application_data);
      const result = await job_application_model.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // employee presentation post
  app.post("/presentation", async (req, res) => {
    try {
      const presentUser = req.body;
      const newPresentation = new presentations(presentUser);
      const result = await newPresentation.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // events post
  app.post("/events", async (req, res) => {
    try {
      const event = req.body;
      const newEvent = new events(event);
      const result = await newEvent.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // post leave request
  app.post("/leaves", async (req, res) => {
    try {
      const leaveData = req.body;
      const newLeaveRequest = new leaves(leaveData);
      const result = await newLeaveRequest.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // post task
  app.post("/add-task", async (req, res) => {
    try {
      const taskData = req.body;
      const newTask = new tasks(taskData);
      const result = await newTask.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // post Save Job Info
  app.post("/saveJobInfo", async (req, res) => {
    try {
      const savedEmail = req.query.email;
      const jobData = req.body;
      const existSaveData = await saveJobInfo.findOne({ email: savedEmail, applicationId: jobData?.applicationId });
      if (existSaveData) {
        return res.send("All Ready Data Saved");
      }
      const saveData = new saveJobInfo(jobData);
      const result = await saveData.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // post route for requested events 
  app.post("/reqEvents" , async (req , res) => {
    try {
      const reqEventData = req.body
      const newReqEventData = req_events(reqEventData)
      const result = await newReqEventData.save()
      res.send(result)
      
    } catch (error) {
      res.status(500).send(error.message)
    }
  })

// Post a blog for blogs feature------>>>>
app.post("/blogs", async(req, res) => {
  try {
    const blogInfo = req.body;
    const newBlog = new blogs(blogInfo);
    const result = await newBlog.save();
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message);
  }
})








}; //end all post function brackets

export default allPostRoutes;
