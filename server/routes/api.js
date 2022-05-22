const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../db/conn");
require("../model/User");
const Course = require("../model/Course");
const { Authenticate, UserTypeAuthenticate } = require("../middleware/Authenticate");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const Cart = require("../model/Cart");
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

router.post("/instructor/addcourse", [UserTypeAuthenticate('Instructor'), upload.single('courseImage')], async (req, res) => {
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
  const instructorCourses = await Course.find({ instructor: course.instructor._id });

  // const count=await Course.find({instructor:course.instructor._id});
  // instructor ={...course.instructor, courseCount:count.length};
  // course={...course,instructor};
  res.status(200).json({ course, instructorCourses });
});
router.get("/instructor/courses", UserTypeAuthenticate('Instructor'), async (req, res) => {
  try {
    const course = await Course.find({ instructor: req.userId });
    res.status(200).json(course);

  } catch (error) {
    console.log(error);
  }
});

router.post("/api/addtocart", UserTypeAuthenticate('Learner'), async (req, res) => {
  try {

    const cartObj = { course: req.body.courseId, userId: req.userId };
    const cart = new Cart({ ...cartObj });
    await cart.save();
    res.status(201).json({ message: "Successfully Added." });
  } catch (error) {
    console.log(error);
  }
});
router.get("/api/carts", UserTypeAuthenticate('Learner'), async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.userId }).populate(
      {
        path: "course",
        "populate": {
          path: "instructor",
          select: 'name'
        }
      });
    res.status(200).json(carts);

  } catch (error) {
    console.log(error);
  }
});

router.post("/api/removefromcart", UserTypeAuthenticate('Learner'), async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.body.cartId });
    res.status(201).json({ message: "Successfully Removed." });
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/order", UserTypeAuthenticate('Learner'), async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.body.cartId });
    res.status(201).json({ message: "Successfully Removed." });
  } catch (error) {
    console.log(error);
  }
});




// const request = require('request');
// router.post('/api/checkout', Authenticate, async (req, res) => {
//   req.body.txnid = Date.now();
//   req.body.email = req.user.email;
//   req.body.name = req.user.name;
//   const pay = req.body;
//   const hashString = 'O0Oys7kn'
//     + '|' + pay.txnid
//     + '|' + pay.amount
//     + '|' + pay.courses_info
//     + '|' + pay.name
//     + '|' + pay.email
//     + '|' + '||||||||||'
//     + 'Ywyzl1r38GE'
//   const sha = new jsSHA('SHA-512', "TEXT");
//   sha.update(hashString);
//   const hash = sha.getHash("HEX");
//   pay.key = 'O0Oys7kn'
//   pay.surl = '/payment/success';
//   pay.furl = '/payment/fail';
//   pay.hash = hash;
//   request.post({
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     url: 'https://sandboxsecure.payu.in/_payment', //Testing url
//     form: pay
//   }, function (error, httpRes, body) {
//     if (error)
//       res.send(
//         {
//           status: false,
//           message: error.toString()
//         }
//       );
//     if (httpRes.statusCode === 200) {
//       res.send(body);
//     } else if (httpRes.statusCode >= 300 &&
//       httpRes.statusCode <= 400) {
//       res.redirect(httpRes.headers.location.toString());
//     }
//   })
// });

// route.post('/payment/success', (req, res) => {
//   res.send(req.body);
// });

// route.post('/payment/fail', (req, res) => {
//    res.send(req.body);
// });



module.exports = router;