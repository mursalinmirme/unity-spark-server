import { app } from "../app.js";
import feedback from "../models/feedback.js";
import jobAds from "../models/jobAds.js";
import users from "../models/users.js";

const allGetRoutes = () => {

    // get specific user data by _id
    app.get("/users/:id", async(req, res) => {
        try {
            const user_id = req.params.id;
            const result = await users.findOne({_id: user_id});
            res.send(result);
        } catch (error) {
            res.status(400).send("Something went wrong.")
        }
    })

    // get all job ads list
    app.get("/job-ads", async(req, res) => {
        try {
            const result = await jobAds.find().sort({_id: -1});
            res.send(result);
        } catch (error) {
            res.status(400).send("Something went wrong.");
        }
    })


    // get specific a job ads details
    app.get("/job-ads/:id", async(req, res) => {
        try {
            const jobAdsId = req.params.id;
            const result = await jobAds.findOne({_id: jobAdsId});
            res.send(result);
        } catch (error) {
            res.status(400).send("Something went wrong.");
        }
    })


    // get all feedback list from employers
    app.get("/feedbacks", async(req, res) => {
        try {
            const result = await feedback.find().sort({_id: -1});
            res.send(result);
        } catch (error) {
            res.status(400).send("Something went wrong.");
        }
    })


    // get user role when he/she will login our website
    app.get("/user-role", async(req, res) => {
        const userEmail = req.query.email;
        const getUserRole = await users.findOne({email: userEmail}, {role: 1, _id: 0})
        console.log(getUserRole, 'from line 57');
        res.send(getUserRole);
    })





    

} //ending all get routes brackets


export default allGetRoutes
