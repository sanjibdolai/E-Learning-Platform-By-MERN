const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("USER",userSchema);
module.exports=User;