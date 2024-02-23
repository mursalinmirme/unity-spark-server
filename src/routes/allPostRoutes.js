import { app } from "../app.js";
import saveJobInfo from "../models/SaveJobInfo.js";
import blogs from "../models/blogs.js";
import comments from "../models/comments.js";
import courses from "../models/courses.js";
import events from "../models/events.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import leaves from "../models/leaves.js";
import presentations from "../models/presentations.js";
import req_events from "../models/requestevents.js";
import tasks from "../models/tasks.js";
import users from "../models/users.js";
import interviews from "../models/interviews.js";
import myCourse from "../models/mycourse.js";
import paymentInfo from "../models/payment.js";
import chat from "../models/chats.js";
import savedBlogs from "../models/savedBlogs.js";
import likedBlogs from "../models/likedBlogs.js";

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
      const existSaveData = await saveJobInfo.findOne({
        email: savedEmail,
        applicationId: jobData?.applicationId,
      });
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
  app.post("/reqEvents", async (req, res) => {
    try {
      const reqEventData = req.body;
      const newReqEventData = req_events(reqEventData);
      const result = await newReqEventData.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Post a blog for blogs feature------>>>>
  app.post("/blogs", async (req, res) => {
    try {
      const blogInfo = req.body;
      const newBlog = new blogs(blogInfo);
      const result = await newBlog.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/bookmarked-blogs", async (req, res) => {
    try {
      const blogInfo = req.body.blogInfo;
      const email = req.body.email;
      const isExist = await savedBlogs.findOne({ email, blogInfo });

      if (isExist) {
        return res.send("exists");
      }
      const result = await new savedBlogs(req.body).save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // comments post api
  app.post("/comments", async (req, res) => {
    try {
      const commentData = req.body;
      const newComment = new comments(commentData);
      const result = await newComment.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Saved Blogs for individual user
  app.post("/savedBlogs", async (req, res) => {
    try {
      const userEmail = req.body.email;
      const blogId = req.body.blogInfo;
      const isExist = await savedBlogs.findOne({
        email: userEmail,
        blogInfo: blogId,
      });

      if (isExist) {
        return res.send("Blog is already saved.");
      }
      const newBlog = new savedBlogs(req.body);

      const result = await newBlog.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // liked Blogs

  app.post("/toggleLike", async (req, res) => {
    const { email, blogId } = req.body;
    try {
      const isLiked = await likedBlogs.findOne({ email, blogId });
      // console.log(isLiked, "like disi");

      if (isLiked) {
        const test = await likedBlogs.findByIdAndDelete(isLiked._id);

        console.log(test, "dddd");
        return res.status(200).json({ isLiked: false });
      } else {
        const newLike = new likedBlogs({ email, blogId });
        await newLike.save();
        console.log(newLike, "newwww");
        return res.status(201).json({ isLiked: true });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // courses post api
  app.post("/courses", async (req, res) => {
    try {
      const courseData = req.body;
      console.log(courseData);
      const newCourseData = new courses(courseData);
      const result = await newCourseData.save();
      console.log("checking", result);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/interviews", async (req, res) => {
    try {
      const interview = req.body;
      console.log(interview);
      const newInterview = new interviews(interview);
      const result = await newInterview.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/my_course", async (req, res) => {
    try {
      const MyCourse = req.body;
      const newMyCourse = new myCourse(MyCourse);
      const result = await newMyCourse.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  });

  // payment info saved
  app.post("/payment", async (req, res) => {
    try {
      const newPayInfo = req.body;
      const payInfo = new paymentInfo(newPayInfo);
      const result = await payInfo.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/chat", async (req, res) => {
    try {
      const newChats = req.body;
      const chats = new chat(newChats);
      const result = await chats.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}; //end all post function brackets

export default allPostRoutes;
