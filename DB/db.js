const { default: mongoose } = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leadify:leadify3000@cluster0.43mq3.mongodb.net/aitodoDB?retryWrites=true&w=majority"
    );
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
  }
};
