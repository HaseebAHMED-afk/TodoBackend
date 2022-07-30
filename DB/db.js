const { default: mongoose } = require("mongoose")
require('dotenv').config()

exports.connectDB = async () =>{
    try {
        await mongoose.connect(process.env.NODE_ENV == 'development' ? 'mongodb://localhost:27017/todoDB' : process.env.REMOTE_DB)
        console.log('DB connected');
    } catch (error) {
        console.log(error.message);
    }
}