const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    taskType: {
      type: String,
      required: false,
    },
    taskLevel: {
      type: String,
      required: false,
    },
    taskStatus: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Task", taskSchema);
