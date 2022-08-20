const { default: axios } = require("axios");
const Employee = require("../Models/Employee");
const Task = require("../Models/Task");
const { taskStatus } = require("../Utils/constant");

exports.createTask = async (req, res) => {
  const { title } = req.body;
  console.log(req.body);
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/?predictionTask=${title}`
    );
    let newTask = new Task({
      title,
      taskType: response?.data?.employee_type,
      taskLevel: response?.data?.expertise_level,
      taskStatus: taskStatus.pending,
    });
    let taskRes = await newTask.save();

    // console.log(response.data);
    console.log(taskRes, "Task res");
    try {
      let employee = await Employee.findOne({
        expertise: taskRes.taskLevel,
        type: taskRes.taskType,
        isAvailable: true,
      });
      console.log("employee", employee);
      if (!employee) {
        newTask.taskStatus = taskStatus.queued;
        taskRes = await newTask.save();
        res.status(200).json({
          status: true,
          message: taskRes,
        });
      } else {
        newTask.assignedTo = employee._id;
        taskRes = await newTask.save();
        let assignedTask = await Task.find({ assignedTo: employee._id });
        if (assignedTask.length >= 5) {
          await Employee.findOneAndUpdate(
            { _id: employee._id },
            { $set: { isAvailable: false } }
          );
          console.log("emp res");
          taskRes = await taskRes.populate("assignedTo");
          res.status(200).json({
            status: true,
            message: taskRes,
          });
        } else {
          console.log("no emp res");
          taskRes = await taskRes.populate("assignedTo");
          res.status(200).json({
            status: true,
            message: taskRes,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.finishTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    let updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: { taskStatus: taskStatus.completed } },
      { new: true }
    );
    try {
      let remain = await Task.find({
        assignedTo: updatedTask.assignedTo,
        taskStatus: taskStatus.completed,
      });
      if (remain.length <= 4) {
        await Employee.findOneAndUpdate(
          { _id: updatedTask.assignedTo },
          { $set: { isAvailable: true } }
        );
        res.status(200).json({
          status: true,
          message: updatedTask,
        });
      } else {
        res.status(200).json({
          status: true,
          message: updatedTask,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("assignedTo");
    res.status(200).json({
      status: true,
      message: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getTaskByEmployees = async (req, res) => {
  const { employeeId } = req.params;
  console.log(employeeId);
  try {
    let tasks = await Task.find({ assignedTo: employeeId }).populate(
      "assignedTo"
    );
    console.log(tasks);
    res.status(200).json({
      status: true,
      message: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
