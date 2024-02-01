import { app } from "../app.js";
import jobapplications from "../models/jobapplications.js";
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
  // job applications update 
  app.put('/job_applications/:id' , async (req , res) => {
    try {
      const data = req?.body
      const id = req.params.id
      // console.log(data)
    const result = await jobapplications.updateOne({_id : id},
         { $set: data },
        { upsert: true });
        res.send(result)
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
};

export default allUpdateRoutes;
