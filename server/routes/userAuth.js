const express = require("express");
const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
require("../db/conn");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const {Authenticate, UserTypeAuthenticate}=require("../middleware/Authenticate");


router.post("/signup", async (req, res) => {
  const { name, email, userType, password } = req.body;
  if (!name || !email || !userType || !password) {
    return res.status(422).json({ error: "Please filled the field propely." });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist." });
    }
    const user = new User({ name, email, userType, password });
    await user.save();
    res.status(201).json({ message: "Successfully Register." });
  } catch (error) {
    console.log(error);
  }

});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please filled the data." });
  }
  try {
    const userLogin = await User.findOne({ email: email });


    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      
      if (!isMatch) {
        res.status(422).json({ error: "Invalid Credentials." });
      } else {
        const token=await userLogin.generateAuthToken();
        res.cookie("jwtoken",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true
        });
        res.status(201).json({ message: "Successfully Login.", userType:userLogin.userType });
      }
    } else {
      res.status(422).json({ error: "Invalid Credentials." });
    }

  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send("User Logout");
});

router.get("/instructor", UserTypeAuthenticate('Instructor') ,(req, res) => {
  res.send(req.rootUser);
});
router.get("/userdata", Authenticate ,(req, res) => {
  res.send(req.rootUser);
});

router.get("/checklogin", Authenticate ,(req, res) => {
  res.status(200).json({userType:req.rootUser.userType });
});


module.exports = router;