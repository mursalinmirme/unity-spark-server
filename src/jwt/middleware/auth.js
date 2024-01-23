import  Jwt   from "jsonwebtoken";
const auth = async (req , res, next) =>{

    try {
        const token = req?.cookies?.token
       if(!token){
        res.status(401).send({massage: 'Unauthorized'})
       }
       Jwt.verify(token, process.env.SECRET_TOKEN, (error , decoded)=>{
        if(error){
            res.status(401).send({massage: 'Unauthorized'})  
        }
        req.user = decoded
        next()
       })
    } catch (error) {
        res.status(401).send(error)
    }

}
export default auth;