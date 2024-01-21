import { app } from "../app.js";
import users from "../models/users.js";

const allUpdateRoutes = () => {

    // update user profile info
    app.put("/users/:id", async(req, res) => {
        try {
            const updateId = req.params.id;
            const updateInfo = req.body;
            const result = await users.updateOne({_id: updateId}, {$set: updateInfo});
            res.send(result)
        } catch (error) {
            res.status(400).send("Something went wrong.")
        }
    })






    
}

export default allUpdateRoutes;










