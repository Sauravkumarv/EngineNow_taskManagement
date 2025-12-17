const mongoose=require("mongoose");
const dotenv=require('dotenv');

dotenv.config();
const dbConnect=async()=>{
  try {
  const mongoUrl=process.env.MONGO_URL;
  await mongoose.connect(mongoUrl);
  console.log("db Connected");
} catch (error) {
  console.log("error is dbConnection",error);
    }
}
module.exports=dbConnect;