const Jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
    
    if(!req?.headers?.authorized){
      return   res.status(401).send({message : "Unauthorized Access"})
    }
    const token = req?.headers?.authorized.split(' ')[1]
    Jwt.verify(token , process.env.SECRET_TOKEN , (err , decoder) => {
      if(err){
        return   res.status(401).send({message : "Unauthorized Access"})
      }
      req.user = decoder
      next()
    })
   
};
module.exports = verifyToken;
  // try {
  //   const token = req?.cookies?.token;
  //   if (!token) {
  //     res.status(401).send({ massage: "Unauthorized" });
  //     return;
  //   }
  //   Jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
  //     if (error) {
  //       res.status(401).send({ massage: "Unauthorized" });
  //       return;
  //     }
  //     req.user = decoded;
  //     next();
  //   });
  // } catch (error) {
  //   res.status(401).send(error);
  // }
