const express= require("express")
const dotenv=require('dotenv');
const dbConnect = require("./config/db");
const router = require("./routes/taskRouter");

dotenv.config();

const app=express();
dbConnect();

app.use(express.urlencoded({extended:true}));

app.use("/api/task",router);

// app.use("/",(req,res)=>{
//   res.json({message:"Hi you are ok!"})
// })

const port=process.env.PORT|| 8000;
 app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
 })
