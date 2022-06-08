const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const enrolledCourseSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref:'Course',
        required: true
    },
    courseProgress:{
        topics: [
            {
                topicId: {
                    type: String,
                    required: true
                },
                status:{
                    type: String,
                    required: false
                },
                lessions: [
                    {
                        lessionId: {
                            type: String,
                            required: true
                        },
                        status:{
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    },
    
},{ timestamps: true });




const EnrolledCourse = mongoose.model("EnrolledCourse", enrolledCourseSchema);
module.exports = EnrolledCourse;