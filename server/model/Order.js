const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const orderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    courses:[{
        courseId:{
        type: Schema.Types.ObjectId,
        ref:'Course',
        required:true
        },
        courseType:{
            type:String,
            required:false
        },
        orderPrice:{
            type:Number,
            required:false
        },
        courseMRP:{
            type:Number,
            required:false
        },
    }],
    totalPrice:{
        type:Number,
        required:false
    }
    
},{ timestamps: true});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;