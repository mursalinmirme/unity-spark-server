import Jwt from "jsonwebtoken";
import { app } from "../app.js";

const CreateToken = async () => {
  app.post("/jwt", async (req, res) => {
    const user = req.body;
    const token = Jwt.sign(user, process.env.SECRET_TOKEN, {
      expiresIn: "10h",
    });
    res.send({token});
  });

  // app.post("/logout", async (req, res) => {
  //   res.clearCookie("token", { maxAge: 0 }).send({ success: false });
  // });
};
export default CreateToken;
