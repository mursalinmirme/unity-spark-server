import mongoose from "mongoose";


const myCourseSchema = mongoose.Schema({
    uniqueID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        require: true
    },
    userEmail: {
        type: String,
        require: true 
    },
    CourseTitle:{
        type: String,
        require: true  
    },
    CourseBanner: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const myCourse = mongoose.model("my_courses" , myCourseSchema)

export default myCourse