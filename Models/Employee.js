const { default: mongoose } = require("mongoose");


const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    expertise:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    technicalExpertise:{
        type:Number,
        required:true
    },
    professionalExpertise:{
        type:Number,
        required:true
    },
    intelligenceExpertise:{
        type:Number,
        required:true
    }
} , {
    timestamps:true
})


module.exports = new mongoose.model('Employee' , employeeSchema)