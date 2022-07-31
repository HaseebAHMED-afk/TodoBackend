const { createTask, finishTask, getAllTasks, getTaskByEmployees } = require('../Controllers/Task')

const router = require('express').Router()


router.post('/createTask' , createTask)
router.post('/finishTask' , finishTask)
router.get('/getAllTasks' , getAllTasks)
router.get('/getTaskByEmployees/:employeeId' , getTaskByEmployees)

module.exports = router