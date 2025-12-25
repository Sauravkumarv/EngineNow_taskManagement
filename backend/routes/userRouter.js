const express=require("express");
const { createNewUser } = require("../controller/userController");
const userRouter=express.Router();

userRouter.post("/signup",createNewUser);


module.exports=userRouter;