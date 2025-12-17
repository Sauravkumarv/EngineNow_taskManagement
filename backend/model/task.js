const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type:String,
      enum: ["low", "medium", "high"],
      default: "medium",
      required: true,
    },
    dueDate: {
      type: Date,
         },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TASKS = mongoose.model("Tasks", taskSchema);
module.exports = TASKS;
