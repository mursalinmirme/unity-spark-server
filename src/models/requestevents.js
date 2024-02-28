const mongoose = require("mongoose");

const requesteventsSchema = mongoose.Schema({
    reqeventName: {
        type: String,
        require: true
    },
    reqeventEmail: {
        type: String,
        require: true
    },
    reqeventId: {
        type: String,
        require: true
    },
    reqeventPosition: {
        type: String,
        require: true
    },
    reqeventHost: {
        type: String,
        require: true
    },
    reqeventStartTime:{
        type: String,
        require:true
    },
    reqeventEmployeeName:{
        type: String,
        require: true
    },
    reqeventDate:{
        type: String,
        require: true
    }

})

const req_events = mongoose.model("req_events" , requesteventsSchema)

module.exports = req_events