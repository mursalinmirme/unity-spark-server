import  Jwt  from "jsonwebtoken"
import { app } from "../app.js"

const CreateToken = async () =>{

  app.post('/jwt', async (req , res) =>{
    const user = req.body
    const token = await Jwt.sign(user, process.env.SECRET_TOKEN ,{expiresIn : '1h'})
    console.log(token)
    res
    .cookie('token' , token , {
      httpOnly: true,
      secure: false,
      sameSite: "none"
    })
    .send({success: true})
  })
  app.post('/logout' , async (req , res) =>{
    const user = req.body
    res.clearCookie('token clear' , {maxAge: 0}).send({success: true})

  })
  
}
 export default CreateToken
