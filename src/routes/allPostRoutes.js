import { app } from "../app.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
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
            res.send("Something went wrong.")
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
            console.log("Something went wrong.");
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
            console.log("Something went wrong.");
        }
    })





    

}


export default allPostRoutes

