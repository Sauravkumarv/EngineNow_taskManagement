const express=require("express");
const { createNewTaskController, getTaskController, getTaskByIdController, updateTaskController } = require("../controller/taskController");
const router=express.Router();


router.post("/create",createNewTaskController);

router.get("/get",getTaskController);
router.get("/get/:id",getTaskByIdController);
router.put("/get/:id",updateTaskController);

module.exports=router;