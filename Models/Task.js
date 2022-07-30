const { default: mongoose } = require("mongoose");


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    taskType:{
        type:String,
        required:true
    },
    taskLevel:{
        type:String,
        required:true
    },
    taskType:{
        type:String,
        required:true
    },
    taskStatus:{
        type:String,
        required:true
    },
} , {
    timestamps:true
})


module.exports = new mongoose.model('Task' , taskSchema)