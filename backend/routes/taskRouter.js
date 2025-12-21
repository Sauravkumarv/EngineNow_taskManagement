const express=require("express");
const { createNewTaskController, getTaskController, getTaskByIdController, updateTaskController, deleteTaskController, toggleComplete } = require("../controller/taskController");
const router=express.Router();


router.post("/create",createNewTaskController);

router.get("/get",getTaskController);
router.get("/get/:id",getTaskByIdController);
router.put("/update/:id",updateTaskController);
router.delete("/delete/:id",deleteTaskController);
router.patch("/toggle/:id", toggleComplete);


module.exports=router;