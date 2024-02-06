import { app } from "../app.js";
import events from "../models/events.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import leaves from "../models/leaves.js";
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

  app.put("/leaves-confirm/:id", async(req, res) => {
     try {
      const leaveId = req.params.id;
      const updateBody = req.body;
      const result = await leaves.updateOne({_id: leaveId}, { $set: updateBody },{ upsert: true })
      console.log(result);
      res.send(result)
     } catch (error) {
      console.log(error.message);
     }
  })



}; //end bracket of all update routes runction

export default allUpdateRoutes;
