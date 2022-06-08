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
const Order = require("../model/Order");
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

router.post("/api/addtocart", Authenticate, async (req, res) => {
  try {

    const cartObj = { course: req.body.courseId, userId: req.userId, cartStatus:'Cart' };
    const cart = new Cart({ ...cartObj });
    await cart.save();
    res.status(201).json({ message: "Successfully Added." });
  } catch (error) {
    console.log(error);
  }
});
router.get("/api/carts", Authenticate, async (req, res) => {
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

router.post("/api/removefromcart", Authenticate, async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.body.cartId });
    res.status(201).json({ message: "Successfully Removed." });
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/saveforlater", Authenticate, async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.body.cartId ,{cartStatus:"Save For Later"},{new: true});
    res.status(201).json({ message: "Successfully Added to Save For Later." });
  } catch (error) {
    console.log(error);
  }
});
router.post("/api/movetocart", Authenticate, async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.body.cartId ,{cartStatus:"Cart"},{new: true});
    res.status(201).json({ message: "Successfully Added to Cart." });
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/movetowishlist", Authenticate, async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.body.cartId ,{cartStatus:"Wishlist"},{new: true});
    res.status(201).json({ message: "Successfully Added to Wishlist." });
  } catch (error) {
    console.log(error);
  }
});

const Razorpay = require("razorpay");
const EnrolledCourse = require("../model/EnrolledCourse");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/api/checkout', Authenticate, async (req, res) => {

  const payment_capture = 1;
  const currency = "INR";

  const options = {
    amount: req.body.amount * 100,
    currency,
    receipt: Date.now(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      cartItems:req.body.cartItems
    });
  } catch (error) {
    console.log(error);
  }

});


router.post('/api/payment/verify', Authenticate , (req, res) => {
  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
  if(expectedSignature === req.body.response.razorpay_signature){
    paymentSuccess(req,res);
  }else{
    paymentFailed(req,res);
  }
 });

const paymentSuccess=async(req,res)=>{
  try {
    var coursesObj=[];
    req.body.response.cartItems.map(e=>{
      coursesObj.push({
        courseId:e.course._id,
        courseType:e.course.courseType,
        orderPrice:e.course.coursePrice,
        courseMRP:e.course.coursePrice
      });
    })
    const orderObj = { userId: req.userId,courses:coursesObj,totalPrice:req.body.amount};
    const order = new Order({ ...orderObj });
    await order.save();
    for(var e of coursesObj){
      const enrolledCourse=new EnrolledCourse({userId: req.userId,courseId:e.courseId});
      await enrolledCourse.save();
    }
    
    await Cart.deleteMany({ userId: req.userId,cartStatus:'Cart' });
    res.send( {payment:"Success"});
  } catch (error) {
    console.log(error);
  }
 }
const paymentFailed=async(req,res)=>{
  res.send( {payment:"Failed"});
 }

 router.post("/api/enrolledcourses", Authenticate, async (req, res) => {
  try {
    const courses = await EnrolledCourse.find({ userId: req.userId }).populate({
      path: "courseId"
    });
    res.status(200).json(courses);
   
  } catch (error) {
    console.log(error);
  }
});
router.post("/api/enrolledcourse", Authenticate, async (req, res) => {
  try {
    const enrolledCourse = await EnrolledCourse.findOne({ userId: req.userId,courseId:req.body.courseId }).populate({
      path: "courseId"
    });
    res.status(200).json(enrolledCourse);
   
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/updateenrolledcoursestatus", Authenticate, async (req, res) => {
  try {
    const enrolledCourse = await EnrolledCourse.findOne({ userId: req.userId,courseId:req.body.courseId }).populate({
      path: "courseId"
    });
    res.status(200).json(enrolledCourse);
   
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;