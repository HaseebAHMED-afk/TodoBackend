const { default: mongoose } = require("mongoose");


const managerSchema = new mongoose.Schema({
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
    }
} , {
    timestamps:true
})


module.exports = new mongoose.model('Manager' , managerSchema)