const Task = require("../Models/Task");
const { taskStatus } = require("../Utils/constant");

exports.createTask = async (req,res) =>{
    const {title , taskType , taskLevel } = req.body;
    try {
        let newTask =  new Task({title , taskType , taskLevel , taskStatus: taskStatus.pending})
        let taskRes = await newTask.save()
        res.status(200).json({
            status:true,
            message: taskRes
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}

exports.finishTask = async (req,res) =>{
    const {taskId } = req.body;
    try {
        let updatedTask =  await Task.findOneAndUpdate({_id:taskId} , {$set:{taskStatus: taskStatus.completed}} ,{new:true})
        res.status(200).json({
            status:true,
            message: updatedTask
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}