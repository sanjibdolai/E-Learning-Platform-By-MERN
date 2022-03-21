const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
require("../db/conn");
const User=require("../model/User");


router.post("/signup",async(req, res) =>{
  const {name,email,userType,password}=req.body;
  if(!name || !email ||!userType || !password){
    return res.status(422).json({error:"Please filled the field propely."});
  }
  try {
    const userExist=await User.findOne({email:email});
    if(userExist){
      return res.status(422).json({error:"Email already exist."});
    }
    const user=new User(name,email,userType,password);
    await user.save();
    res.status(201).json({message:"Successfully Register."});
  } catch (error) {
    console.log(error);
  }

});
router.post("/login",(req, res) =>{
  console.log("Hello");
});

router.get("/instructor/lessons",(req, res) =>{
  res.send("Hello");
});

module.exports = router;