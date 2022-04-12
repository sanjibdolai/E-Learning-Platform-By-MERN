const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const courseSchema = new Schema({
    instructor:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
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
        required: true
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
        required: true
    },
    difficultyLevel:{
        type: String,
        required: false
    },
    topics: [
        {
            topicName: {
                type: String,
                required: true
            },
            topicDescription: {
                type: String,
                required: false
            },
            lessions: [
                {
                    lessionTitle: {
                        type: String,
                        required: true
                    },
                    lessionPreview:{
                        type:Boolean,
                        required:false
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
                    lessionImportantLinks: [String]
                }
            ]
        }
    ]
},{ timestamps: true,selectPopulatedPaths: false,toJSON: { virtuals: true }, toObject: {virtuals: true} });




const Course = mongoose.model("Course", courseSchema);
module.exports = Course;