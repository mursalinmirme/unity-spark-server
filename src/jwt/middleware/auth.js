import  Jwt   from "jsonwebtoken";
const auth = async (req , res, next) =>{

    try {
        const token = req.cookies?.token
       if(!token){
        res.status(401).send({massage: 'Not Authorized'})
       }
    } catch (error) {
        res.status(401).send(error)
    }

}
export default auth;