const TASKS = require("../model/task");


const MAX_TITLE_WORDS = 24;

const createNewTaskController = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Basic required field validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    //  Title word limit validation (24 words)
    const titleWordCount = title.trim().split(/\s+/).length;
    if (titleWordCount > MAX_TITLE_WORDS) {
      return res.status(400).json({
        message: "Title can contain maximum 24 words",
      });
    }

    //Priority validation
    const allowedPriorities = ["low", "medium", "high"];
    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        message: "Priority must be low, medium, or high",
      });
    }

    let formattedDueDate;

    if (dueDate) {
  const [day, month, year] = dueDate.split("/");
  formattedDueDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(formattedDueDate.getTime())) {
    return res.status(400).json({
      message: "Invalid dueDate format. Use DD/MM/YYYY",
    });
  }
}

    //  Create task
    const newTask = await TASKS.create({
      //userId: req.user?.id,  optional (JWT protected route)
      title,
      description,
      priority,
      dueDate:formattedDueDate,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error in createNewTaskController:", error.message);

    return res.status(500).json({
      message: "Internal server error while creating task",
    });
  }
};



const getTaskController = async (req, res) => {
  try {
    const { status, sort } = req.query;

    let query = {};

    if (status === "completed") query.completed = true;
    if (status === "pending") query.completed = false;

    let sortOption = {};
    if (sort === "priority") sortOption.priority = 1;
    if (sort === "dueDate") sortOption.dueDate = 1;

    const tasks = await TASKS.find(query).sort(sortOption);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks available" });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error in getting tasks",
      error: error.message,
    });
  }
};


const getTaskByIdController=async(req,res)=>{
  try {
    const {id}=req.params; 

    const gettaksbyId=await TASKS.findById(id);
    if(!gettaksbyId){
      return res.status(404).json({message:"No task availble"})
    }
        return res.status(200).json({message:"Tasked Fetched Successfully by ID",All_Tasks:gettaksbyId})

  } catch (error) {
    console.log("Error in getTaskByIdController",error.message)
    return res.status(500).json({message:"Error in getting tasks",error})
  }
}

const updateTaskController=async(req,res)=>{
try {
  const {id}=req.params;
  const updateBody=req.body;
  if(!id){
    return res.status(404).json({message:"Task Id Undefined"})
  };

  const updateTask=await TASKS.findByIdAndUpdate(id,updateBody);

  if(!updateTask){
    return res.status(404).json({message:"Task Not found"})
  }
  return res.status(200).json({message:"Task Updated Successfully",updateTask})
  
} catch (error) {
  console.log("Error in updateTaskController",error.message)
    return res.status(500).json({message:"Error in getting tasks",error})
}
}

const deleteTaskController=async(req,res)=>{
  try {
    const {id}=req.params;
    const remove=await TASKS.findByIdAndDelete(id);
    if(!remove){
      return res.status(404).json({message:"Task Not found"})
    }
return res.status(200).json({message:"Task Deleted Successfully",remove})
  
  } catch (error) {
    console.log("Error in deleteTaskController",error.message)
    return res.status(500).json({message:"Error in deleteTaskController",error})
  }
}

const toggleComplete = async (req, res) => {
 try {
  const task = await TASKS.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  await task.save();

  
  return res.status(200).json({message:"Task status updated Successfully",task})
 } catch (error) {
    console.log("Error in toggleComplete",error.message)
    return res.status(500).json({message:"Error in toggleComplete",error})
 }
};



module.exports = {
  createNewTaskController,getTaskController,getTaskByIdController,updateTaskController,deleteTaskController,toggleComplete
  };