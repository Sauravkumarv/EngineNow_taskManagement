const express=require("express");
const { createNewTaskController } = require("../controller/taskController");
const router=express.Router();

router.post("/create",createNewTaskController);


module.exports=router;