import mongoose from "mongoose";

const ServicesSchema = mongoose.Schema({
    img:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }
})

const services = mongoose.model("services" , ServicesSchema)

export default services