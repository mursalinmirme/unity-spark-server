import { app } from "../app.js";
import users from "../models/users.js";

// All Post Requests
const allPostRoutes = () => {
    // user sign up route
    app.post('/users', async(req, res) => {
        try {
            const newUser = req.body;
        const existingUser = await users.findOne({email: newUser.email})
        if(existingUser){
            return
        }
        const usersModel = new users(newUser)
        const result = await usersModel.save();
        res.send(result); 
        } catch (error) {
            res.send("Something went wrong.")
        }                
    })




    

}


export default allPostRoutes

