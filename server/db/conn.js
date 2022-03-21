const mongoose=require("mongoose");
const DB = process.env.ATLAS_URI;

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('Successfully connected to MongoDB.')
}).catch((err)=> console.log(err));
