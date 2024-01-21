import { app } from "../app.js";
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

    


}


export default allGetRoutes
