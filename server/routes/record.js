const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const dbo = require("../db/conn");


router.get("/instructor/lessons",(req, res) =>{
  console.log("Hello");
});


module.exports = router;