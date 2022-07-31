const { createTask, finishTask } = require('../Controllers/Task')

const router = require('express').Router()


router.post('/createTask' , createTask)
router.post('/finishTask' , finishTask)

module.exports = router