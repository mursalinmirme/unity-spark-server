const app = require("../app.js");
const saveJobInfo = require("../models/SaveJobInfo.js");
const blogs = require("../models/blogs.js");
const courses = require("../models/courses.js");
const events = require("../models/events.js");
const jobAds = require("../models/jobAds.js");
const jobapplications = require("../models/jobapplications.js");
const req_events = require("../models/requestevents.js");
const tasks = require("../models/tasks.js");

const allDeleteRoutes = (app) => {
  // job application delete
  app.delete("/job_applications/:id", async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await jobapplications.deleteOne({ _id: id });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
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
  // requested event delete api
  app.delete("/reqEvents/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await req_events.deleteOne({ _id: id });
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  // task delete api
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await tasks.deleteOne({_id: id});
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
  // delete a specific blog from blogs models----->>>>>>>
  // requested blog delete api
  app.delete("/blogs/:id" , async (req , res) => {
    try {
      const id = req.params.id
      const result = await blogs.deleteOne({_id : id})
      res.send(result)
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  // course delete api
  app.delete("/courses/:id" , async (req , res) =>{
    try {
      const id = req.params.id
      const result = await courses.deleteOne({_id : id})
      res.send(result)
    } catch (error) {
      res.status(500).send(error.message);
    }
  })




}; //end all delete routes function end brackets


module.exports = allDeleteRoutes;
