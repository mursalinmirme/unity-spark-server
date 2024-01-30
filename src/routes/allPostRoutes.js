import { app } from "../app.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import jobapplications from "../models/jobapplications.js";
import users from "../models/users.js";

// All Post Requests
const allPostRoutes = () => {
    // user sign up route
    app.post('/users', async(req, res) => {
        try {
            const newUser = req.body;
        const existingUser = await users.findOne({email: newUser.email})
        if(existingUser){
            return res.send("users already exist!")
        }
        const usersModel = new users(newUser)
        const result = await usersModel.save();
        res.send(result); 
        } catch (error) {
            res.send(error.message)
        }                
    })
    

    // job ads post
    app.post('/job-ads', async (req, res) => {
        try {
            const newJobAds = req.body;
            const jobAdsModel = new jobAds(newJobAds);
            const result = await jobAdsModel.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    })

    // post a feedback from employee
    app.post('/feedbacks', async (req, res) => {
        // post a feedback
        try {
            const newFeedback = req.body;
            const feedbackModel = new feedback(newFeedback);
            const result = await feedbackModel.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    })

    // posting job applications data
    app.post('/job-application', async (req , res) => {
    try {
        const application_data = req.body;
        console.log(application_data)
        const job_application_model = new jobapplications(application_data)
        const result = await job_application_model.save()
        res.send(result)
        } catch (error) {
           console.log(error.message) 
        }
    })





    

}//end all post function brackets


export default allPostRoutes

