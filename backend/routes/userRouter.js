const express=require("express");
const { createNewUser, loginController } = require("../controller/userController");
const userRouter=express.Router();

userRouter.post("/signup",createNewUser);
userRouter.post("/login",loginController);


module.exports=userRouter;