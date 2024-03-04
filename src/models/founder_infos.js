import mongoose from "mongoose";
const founderInfoSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    position:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    FB:{
        type: String,
        require: true
    },
    IG:{
        type: String,
        require: true
    },
    LINK:{
        type: String,
        require: true
    }
})

const founderInfo = mongoose.model("founder_infos" , founderInfoSchema)

export default founderInfo;