import mongoose from "mongoose";

const jobAdsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
        trim: true,
        unique: true,
    },
    jobType: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
    },
    employeType: {
        type: String,
        require: true,
        minlength: [3 , "minimum length of the feedback title should be 3"],
        maxlength: [100, "maximum length of the feedback title should be 10"],
    },
    salary: {
        type: Number,
        require: true,
        min: [3, "minimum salary of the employee  should be 3k"],
        max: [200, "maximum salary of the employee  should be 200k"]
    },
    description: {
        type: String,
        require: true,
    },
    jobPostedAt: {
        type: Date,
        default: Date.now(),
    }

})


const jobAds = mongoose.model("job_ads", jobAdsSchema);


export default jobAds;














