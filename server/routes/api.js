const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../db/conn");
require("../model/User");
const Course = require("../model/Course");
const Authenticate = require("../middleware/Authenticate");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

router.post("/instructor/addcourse", [Authenticate, upload.single('courseImage')], async (req, res) => {
  try {

    const courseObj = { ...req.body, courseImage: req.file.filename, topics: JSON.parse(req.body.topics), instructor: req.userId };
    console.log(courseObj);
    const course = new Course({ ...courseObj });
    await course.save();
    res.status(201).json({ message: "Successfully Added." });
  } catch (error) {
    console.log(error);
  }

});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: "instructor",
      select: 'name'
    });
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
  }
});
router.get("/api/course/:id", async (req, res) => {
  const {
    id
  } = req.params;

  const course = await Course.findById(id).populate(
    {
      path: "instructor",
      select: 'name'
    });
  const instructorCourses=await Course.find({instructor:course.instructor._id});
  
  // const count=await Course.find({instructor:course.instructor._id});
  // instructor ={...course.instructor, courseCount:count.length};
  // course={...course,instructor};
  res.status(200).json({course,instructorCourses});
});
router.get("/instructor/courses", Authenticate, async (req, res) => {
  try {
    const course = await Course.find({ instructor: req.userId });
    res.status(200).json(course);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;