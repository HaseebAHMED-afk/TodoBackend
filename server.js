const express = require('express')
const cors = require('cors')
const { connectDB } = require('./DB/db')

const managerRouter = require('./Routes/Manager')
const employeeRouter = require('./Routes/Employee')
const taskRouter = require('./Routes/Task')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/manager' , managerRouter)
app.use('/api/v1/employee' , employeeRouter)
app.use('/api/v1/task' , taskRouter)

connectDB()

const PORT = process.env.PORT || 4000;

app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT}`);
})