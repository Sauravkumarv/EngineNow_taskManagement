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

module.exports = {
  createNewTaskController,
};
