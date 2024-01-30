import { app } from "../app.js";
import jobapplications from "../models/jobapplications.js";

const allDeleteRoutes = () => {
  // job application delete 
  app.delete('/job-application/:id', async (req , res) =>{
      const id = req.params.id
      console.log(id)
      const result = await jobapplications.deleteOne({_id : id})
      res.send(result)
  })
};

export default allDeleteRoutes;
