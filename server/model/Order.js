const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const orderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    courses:[{
        course_Id:{
        type: Schema.Types.ObjectId,
        ref:'Course',
        required:true
        },
        course_price:{
            type:Number,
            required:false
        },
        course_mrp:{
            type:Number,
            required:false
        },
    }],
    total_price:{
        type:Number,
        required:false
    }
    
},{ timestamps: true});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;