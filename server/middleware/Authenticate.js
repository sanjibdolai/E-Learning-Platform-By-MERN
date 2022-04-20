const jwt=require("jsonwebtoken");
const User=require("../model/User");

const Authenticate=async (req,res,next)=> {
    try {
        const token=req.cookies.jwtoken;
        
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('User not found');
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        req.userType=rootUser.userType;

        next();
        
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided.");
        console.log(error);
    }
};

const UserTypeAuthenticate = function(userType) {
    return function(req, res, next){
        Authenticate(req, res, function () {
        if(req.userType === userType){
          next();
        } else {
          return res.status(403).json({
            success: false,
            message: "You don't have the right permission to access this resource :)"
          });
        }
      });
    }
  };
  

module.exports={Authenticate,UserTypeAuthenticate};