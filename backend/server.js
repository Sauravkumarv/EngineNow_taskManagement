const express= require("express")
const dotenv=require('dotenv');
const dbConnect = require("./config/db");
const router = require("./routes/taskRouter");
const cors=require("cors");
const userRouter = require("./routes/userRouter");
dotenv.config();

const app=express();
dbConnect();
const corsOrigin=process.env.FRONTEND_URL;


app.use(cors({
  origin:corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
}))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/auth",userRouter)
app.use("/api/task",router);

// app.use("/",(req,res)=>{
//   res.json({message:"Hi you are ok!"})
// })

const port=process.env.PORT|| 8000;
 app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
 })
