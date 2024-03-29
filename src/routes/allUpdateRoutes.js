import { app } from "../app.js";
import verifyToken from "../jwt/middleware/auth.js";
import blogs from "../models/blogs.js";
import courses from "../models/courses.js";
import events from "../models/events.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import leaves from "../models/leaves.js";
import myCourse from "../models/mycourse.js";
import tasks from "../models/tasks.js";
import users from "../models/users.js";

const allUpdateRoutes = () => {
  // update user profile info
  app.put("/users/:email", async (req, res) => {
    try {
      const updateEmail = req.params.email;
      const updateInfo = req.body;
      const result = await users.updateOne(
        { email: updateEmail },
        { $set: updateInfo },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(400).send("Something went wrong.");
    }
  });

  // user confirm employee

  app.patch("/confirm-employee/:id", async (req, res) => {
    try {
      const updateId = req.params.id;
      const updateInfo = req.body;
      console.log("check body ", updateInfo);
      const result = await users.updateOne(
        { _id: updateId },
        { $set: updateInfo },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(400).send("Something went wrong.");
    }
  });

  app.put("/users", async (req, res) => {
    try {
      const updateEmail = req.query.email;
      const result = await users.updateOne(
        { email: updateEmail },
        { $set: { role: "employee" } },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.put("/user-role/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const result = await users.updateOne(
        { _id: id },
        { $set: body },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // job applications update
  app.put("/job_applications/:id", async (req, res) => {
    try {
      const data = req?.body;
      const id = req.params.id;
      // console.log(data)
      const result = await jobapplications.updateOne(
        { _id: id },
        { $set: data },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // job-ads update
  app.put("/job-ads/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedJob = req.body;
      const result = await jobAds.updateOne(
        { _id: id },
        { $set: updatedJob },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

  // Event update
  app.put("/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedEvent = req.body;
      const result = await events.updateOne(
        { _id: id },
        { $set: updatedEvent },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.put("/leaves-confirm/:id", async (req, res) => {
    try {
      const leaveId = req.params.id;
      const updateBody = req.body;
      const result = await leaves.updateOne(
        { _id: leaveId },
        { $set: updateBody },
        { upsert: true }
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.put("/application-status/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const result = await jobapplications.updateOne(
        { _id: id },
        { $set: update },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  });

  // task update
  app.put("/tasks/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateTask = req.body;
      console.log(id, updateTask);
      const result = await tasks.updateOne(
        { _id: id },
        { $set: updateTask },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
  // task status changed
  app.put("/complete-task/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await tasks.updateOne(
        { _id: id },
        { $set: {status: "complete"} },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
  // task management tast checklist progress update api
  app.put("/my-running-task-progress/:id", async (req, res) => {
    try {
      const runningTaskId = req.body.currentTaskId;
      const taskerId = req.params.id;
      const checkIfExist = await tasks.findOne(
        { _id: runningTaskId, "employees._id": taskerId },
        { "employees.$": 1 }
      );
      const taskStatus = checkIfExist.employees[0].status;
      if (taskStatus === "complete") {
        const result = await tasks.updateOne(
          { _id: runningTaskId, "employees._id": taskerId },
          { $set: { "employees.$.status": "running" } }
        );
        res.send(result);
        return;
      }
      const result = await tasks.updateOne(
        { _id: runningTaskId, "employees._id": taskerId },
        { $set: { "employees.$.status": "complete" } }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // update a specific blog from blogs models----->>>>>>>
  // requested blog delete api
  app.put("/blogs/:id", async (req, res) => {
    try {
      const updateId = req.params.id;
      const updateInfo = req.body;
      const result = await blogs.updateOne(
        { _id: updateId },
        { $set: updateInfo },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // course update api
  app.put("/courses/:id", verifyToken, async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValue = req.body;
      console.log(updatedValue);
      const result = await courses.updateOne(
        { _id: id },
        { $set: updatedValue },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // my courses status update API
  app.put("/course_status_update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await myCourse.updateOne(
        { _id: id },
        { $set: { CourseStatus: "Completed" } },
        { upsert: true }
      );
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
}; //end bracket of all update routes runction

export default allUpdateRoutes;
