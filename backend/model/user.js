const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Task_Schema=mongoose.model("tasks",taskSchema);
module.exports=Task_Schema;
