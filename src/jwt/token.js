import  Jwt  from "jsonwebtoken"

const CreateToken = async () =>{
  const token = await Jwt.sign({_id:"65ad7e063a89dc97a1801722"}, "615479e7b63e61e1552f4b689009ee1c7e2f589b5032d7bb07b9dcdc9e27e998eb90ea5ae498e0e1502e9c3ce96ee693d580d8f6285b5ed8ec7d3bd2b83b76ef" ,{expiresIn : '1h'})
  console.log(token)
}
 export default CreateToken
