const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    instructorId:{
        type: String,
        required: false
    },
    courseTitle: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseType: {
        type: String,
        required: false
    },
    coursePrice: {
        type: Number,
        required: false
    },
    courseCategory: {
        type: String,
        required: false
    },
    courseSubCategory: {
        type: String,
        required: false
    },
    courseImage: {
        type: String,
        required: false
    },
    topics: [
        {
            topicName: {
                type: String,
                required: false
            },
            topicDescription: {
                type: String,
                required: false
            },
            lessions: [
                {
                    lessionTitle: {
                        type: String,
                        required: false
                    },
                    lessionContent: {
                        type: String,
                        required: false
                    },
                    lessionDuration: {
                        type: Number,
                        required: false
                    },
                    lessionVideoURL: {
                        type: String,
                        required: false
                    },
                    lessionResourcesPath: {
                        type: String,
                        required: false
                    },
                    lessionResourcesPath: [String]
                }
            ]
        }
    ]
});




const Course = mongoose.model("COURSE", courseSchema);
module.exports = Course;