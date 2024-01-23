import  Jwt   from "jsonwebtoken";
const auth = async (req , res, next) =>{

    try {
        const token = req.cookies.Jwt
        const verifyUser = Jwt.verify(token, "615479e7b63e61e1552f4b689009ee1c7e2f589b5032d7bb07b9dcdc9e27e998eb90ea5ae498e0e1502e9c3ce96ee693d580d8f6285b5ed8ec7d3bd2b83b76ef")
    } catch (error) {
        res.status(401).send(error)
    }

}
export default auth;