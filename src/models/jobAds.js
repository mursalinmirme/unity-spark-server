import mongoose from "mongoose";

const jobAdsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    jobType: {
        type: String,
        require: true,
    },
    employeType: {
        type: String,
        require: true,
    },
    salary: {
        type: String,
        require: true
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














