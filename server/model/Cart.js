const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const cartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    cartStatus:{
        type: String,
        required: true
    }
},{ timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;